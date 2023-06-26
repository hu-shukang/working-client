import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default defineNuxtPlugin({
  name: 'element-icon-plugin',
  enforce: process.server ? 'pre' : 'post',
  async setup(nuxtApp) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      nuxtApp.vueApp.component(key, component);
    }
  }
});
