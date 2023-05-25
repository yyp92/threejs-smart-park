const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        {
          loader: "webpack-glsl-loader",
        },
      ],
    });
  },
});
