import { createApp } from 'vue';
import './assets/styles/reset.scss';
import './assets/styles/main.scss';
import App from './App.vue';
import { router } from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
