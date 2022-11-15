const { defineConfig } = require("@vue/cli-service");
module.exports = {
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        /*  pathRewrite: { '^/api': '' }, */ //使用正则表达式来筛选掉前缀
        //  ws: true, //用于支持websocket
        //   changeOrigin: true //是否说谎  false的话就是访问真实的端口，用于控制请求头中的host
      },
    },
  },
};
