module.exports = {
  devServer: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:1118',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
