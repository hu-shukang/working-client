import { useGlobalStore } from '@/stores/global.store';
import { Const } from '@/utils';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const signupStatusGuard = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const globalStore = useGlobalStore();
  if (globalStore.info && globalStore.info.signupStatus === Const.FINISH) {
    next(true);
  } else {
    next('/user/sign-up');
  }
};
