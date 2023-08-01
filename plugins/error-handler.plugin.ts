export default defineNuxtPlugin({
  name: 'error-handler-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    nuxtApp.vueApp.config.errorHandler = (error, context) => {
      console.log('=== error handler ===');
      console.log(error);
      console.log(context);
    };

    window.addEventListener('error', (event) => {
      console.log('=== window error handler ===');
      console.log(event);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.log('=== window unhandledrejection handler ===');
      console.log(event);
    });
  }
});
