module.exports = {
  devServer: {
    open: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:1118',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },
      '^/epidemic': {
        target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
        pathRewrite: {
          '^/epidemic': ''
        },
        changeOrigin: true
      }
    },
    disableHostCheck: true
  }
}
