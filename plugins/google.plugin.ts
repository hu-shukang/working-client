import vue3GoogleLogin from 'vue3-google-login';

export default defineNuxtPlugin({
  name: 'google-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(vue3GoogleLogin, {
      clientId: '204168368467-tuv4ork27tubhsrr5sq7q35mg5pma1uu.apps.googleusercontent.com'
    });
  }
});
