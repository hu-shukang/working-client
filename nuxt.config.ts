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
  modules: [
    '@element-plus/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vue3-google-signin'
  ],
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  plugins: [{ src: '@/plugins/editor.plugin', ssr: false }],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  googleSignIn: {
    clientId: '204168368467-tuv4ork27tubhsrr5sq7q35mg5pma1uu.apps.googleusercontent.com'
  }
});
