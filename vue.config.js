const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer:{
    open:true,
    // proxy:"http://localhost:4000"
    //可配置多个跨域
    proxy:{
      '/4000': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
            '^/4000': ''
        }
    }
    }
  },
  lintOnSave:false,
  //配别名
  configureWebpack:{
    resolve:{
      alias:{
        'components':resolve('src/components'),
        'pages':resolve('src/pages')
      }
    }
  }
}

