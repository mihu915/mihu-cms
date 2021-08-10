module.exports = {
  devServer: {
    open: true,
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
