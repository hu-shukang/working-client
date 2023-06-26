// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/style/variables.scss',
    '~/assets/style/reset.scss',
    '~/assets/style/main.scss'
  ],
  modules: ['@element-plus/nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
});
