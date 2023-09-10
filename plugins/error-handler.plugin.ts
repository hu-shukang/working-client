import { ClientError, HttpError } from '~/types/error.type';

export default defineNuxtPlugin({
  name: 'error-handler-plugin',
  enforce: process.server ? 'pre' : 'post',
  setup(nuxtApp) {
    const errorHandler = (error: Error) => {
      if (error.name === 'HttpError') {
        const err = error as HttpError;
        const message = `[${err.businessErrorCode}]: ${err.message}`;
        ElMessageBox.alert(message, 'エラー', {
          confirmButtonText: 'OK'
        });
      } else if (error.name === 'ClientError') {
        const err = error as ClientError;
        const message = `[${err.businessErrorCode}]: ${err.message}`;
        ElMessageBox.alert(message, 'エラー', {
          confirmButtonText: 'OK'
        });
      } else {
        ElMessageBox.alert(error.message, 'エラー', {
          confirmButtonText: 'OK'
        });
      }
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
