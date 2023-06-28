import piniaPersist from 'pinia-plugin-persist';

export default defineNuxtPlugin({
  name: 'pinia-plugin',
  setup(nuxtApp) {
    (nuxtApp.vueApp as any).pinia?.use(piniaPersist);
  }
});
