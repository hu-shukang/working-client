import { useIndexStore } from '~/stores/index.store';

export default defineNuxtRouteMiddleware((to, from) => {
  const indexStore = useIndexStore();
  console.log(`from: ${from.path}`);
  console.log(`to: ${to.path}`);
  if (!indexStore.certification) {
    return navigateTo('/user/login');
  } else if (indexStore.employeeInfo?.signupStatus === ConstUtil.PENDING) {
    return navigateTo('/user/signup');
  }
  return navigateTo(to);
});
