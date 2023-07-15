import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default defineNuxtPlugin({
  name: 'editor-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(mavonEditor);
  }
});
