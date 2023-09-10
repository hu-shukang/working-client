import { useIndexStore } from '~/stores/index.store';

export default defineNuxtRouteMiddleware((to, _from) => {
  const indexStore = useIndexStore();

  if (!indexStore.certification) {
    return navigateTo('/user/login');
  } else if (!indexStore.employeeInfo?.id) {
    return navigateTo('/user/profile');
  }
  return navigateTo(to);
});
