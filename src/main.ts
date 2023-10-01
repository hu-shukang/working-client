import { createApp } from 'vue';
import './assets/styles/reset.scss';
import './assets/styles/main.scss';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/notification/style/css';
import App from './App.vue';
import { router } from './router';
import vue3GoogleLogin from 'vue3-google-login';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(
  createPersistedState({
    auto: true,
    storage: sessionStorage,
  }),
);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.mount('#app');
