import { useIndexStore } from '~/stores/index.store';

export default defineNuxtRouteMiddleware((to, _from) => {
  const indexStore = useIndexStore();

  if (!indexStore.user) {
    return navigateTo('/user/login');
  } else if (!indexStore.user.employeeCode) {
    return navigateTo('/user/profile');
  }
  return navigateTo(to);
});
