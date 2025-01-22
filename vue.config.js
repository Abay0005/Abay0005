
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        '__VUE_OPTIONS_API__': true, // Для поддержки Composition API
        '__VUE_PROD_DEVTOOLS__': false, // Отключение devtools в production
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false, // Устранение предупреждения
      }),
    ],
  },
});
