import { useGlobalStore } from '@/stores/global.store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const signinGuard = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const globalStore = useGlobalStore();
  if (!globalStore.info) {
    next('/user/sign-in');
  } else {
    next(true);
  }
};
