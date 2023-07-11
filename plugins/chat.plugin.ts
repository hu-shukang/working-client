import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  DoughnutController,
  ArcElement,
  LinearScale,
  Colors,
  Legend
} from 'chart.js';

export default defineNuxtPlugin({
  name: 'chat-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(_nuxtApp) {
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LineController,
      LineElement,
      PointElement,
      Tooltip,
      Title,
      DoughnutController,
      ArcElement,
      LinearScale,
      Colors,
      Legend
    );
  }
});
