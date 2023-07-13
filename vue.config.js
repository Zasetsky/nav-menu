const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_variables.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    config.module.rules.delete("svg");
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
});
