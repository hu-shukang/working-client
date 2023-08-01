import ElementPlus from 'element-plus';
import ja from 'element-plus/dist/locale/ja.mjs';

export default defineNuxtPlugin({
  name: 'element-plus-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(ElementPlus, {
      locale: ja
    });
  }
});
