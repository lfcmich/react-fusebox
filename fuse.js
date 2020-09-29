const {
  FuseBox,
  WebIndexPlugin,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  UglifyJSPlugin,
  QuantumPlugin,
  EnvPlugin,
} = require('fuse-box')

const PORT = 8080

const { src, task, context } = require('fuse-box/sparky')

context({
  setConfig({ env = 'production' }) {
    const configFile = {
      production: '.env.production',
      uat: '.env.uat',
      development: '.env',
    }

    return FuseBox.init({
      homeDir: './src',
      output: './dist/$name.js',
      target: 'browser',
      useTypescriptCompiler: true,
      allowSyntheticDefaultImports: true,
      plugins: [
        CSSPlugin(),
        SVGPlugin(),
        env !== 'development' && QuantumPlugin(),
        EnvPlugin(require('dotenv').config({ path: configFile[env] }).parsed),
        BabelPlugin({
          config: {
            sourceMaps: env === "development",
            presets: ['es2015'],
            plugins: ['transform-react-jsx'],
          },
        }),
        WebIndexPlugin({
          template: 'public/index.html',
        }),
      ],
    })
  },
  createBundle(fuse) {
    return fuse.bundle('app').instructions(`> index.js`).hmr()
  },
})

task('clean', () => src('dist').clean('dist').exec())

task('default', ['clean'], async (context) => {
  const fuse = context.setConfig({ env: 'development' })
  fuse.dev({ port: PORT })
  context.createBundle(fuse).hmr().watch()
  await fuse.run()
})

task('build', ['clean'], async (context) => {
  const fuse = context.setConfig({ env: 'production' })
  // fuse.bundle('app.js').instructions(`> index.js`).hmr() // FULL
  fuse.bundle('app.js').instructions(`> index.js`).hmr()
  fuse.bundle('vendor.js').instructions(`~ **/**.{js,jsx}`).hmr()
  await fuse.run()
})
