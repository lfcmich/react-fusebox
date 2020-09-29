const {
  FuseBox,
  WebIndexPlugin,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  UglifyJSPlugin,
  EnvPlugin,
} = require('fuse-box')

const PORT = 8080

const { src, task, context } = require('fuse-box/sparky')

context({
  setConfig(isProduction = true) {
    return FuseBox.init({
      homeDir: './src',
      output: '../dist/$name.js',
      target: 'browser',
      useTypescriptCompiler: true,
      allowSyntheticDefaultImports: true,
      plugins: [
        CSSPlugin(),
        SVGPlugin(),
        EnvPlugin(require('dotenv').config().parsed),
        BabelPlugin({
          config: {
            sourceMaps: !isProduction,
            presets: ['es2015'],
            plugins: ['transform-react-jsx'],
          },
        }),
        UglifyJSPlugin(),
        WebIndexPlugin({
          template: 'src/public/index.html',
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
  const fuse = context.setConfig()
  fuse.dev({ port: PORT})
  context.createBundle(fuse).hmr().watch()
  await fuse.run()
})

task('build', ['clean'], async (context) => {
  const fuse = context.setConfig()
  context.createBundle(fuse).instructions(`>[index.js]`)
  fuse.bundle('vendor.js').instructions(`~index.js`)
  await fuse.run()
})
