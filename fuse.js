const {
  FuseBox,
  WebIndexPlugin,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  UglifyJSPlugin,
  LESSPlugin,
  CSSResourcePlugin,
  QuantumPlugin,
  EnvPlugin,
} = require('fuse-box')

const PORT = 8080

const path = require('path')

const { src, task, context } = require('fuse-box/sparky')

const lessRegex = /\.less$/

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
        [
          /(node_modules|less).*\.less$/,
          LESSPlugin({
            javascriptEnabled: true,
            paths: [
              path.join(__dirname, 'src/less'),
              path.resolve(__dirname, 'node_modules'),
            ],
          }),
          CSSResourcePlugin(),
          CSSPlugin(),
        ],
        CSSPlugin(),
        SVGPlugin(),
        env !== 'development' && QuantumPlugin({ css: true }),
        EnvPlugin(require('dotenv').config({ path: configFile[env] }).parsed),
        BabelPlugin({
          config: {
            sourceMaps: process.env.NODE_ENV === 'development',
            presets: ['es2015'],
            plugins: [['transform-react-jsx']],
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
  fuse.dev({ port: PORT,fallback: "index.html" })
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
