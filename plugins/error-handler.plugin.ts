export default defineNuxtPlugin({
  name: 'error-handler-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    const errorHandler = (error: any) => {
      ElMessageBox.alert(error.message, 'エラー', {
        confirmButtonText: 'OK'
      });
    };

    nuxtApp.vueApp.config.errorHandler = (error: any) => {
      errorHandler(error);
    };

    window.addEventListener('error', (event) => {
      errorHandler(event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.log('=== unhandledrejection ===');
      console.log(event);
    });
  }
});
