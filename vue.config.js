const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        implementation: require('sass'),
        additionalData: `@import "@/assets/scss/_variables.scss"; @import "@/assets/scss/style.scss";`,
      },
    },
  }
})
