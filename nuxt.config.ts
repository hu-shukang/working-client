// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    '~/assets/style/variables.scss',
    '~/assets/style/reset.scss',
    '~/assets/style/util.scss',
    '~/assets/style/main.scss'
  ],
  modules: ['@element-plus/nuxt', '@nuxt/content', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
});
