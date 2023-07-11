import { Chart, registerables } from 'chart.js';

export default defineNuxtPlugin({
  name: 'chat-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(_nuxtApp) {
    Chart.register(...registerables);
  }
});
