module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1118',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
