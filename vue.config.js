const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", //服务端地址
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "/api", // 保持 /api 前缀
        },
        logLevel: "debug", // 添加日志方便调试
      },
    },
  },
});
