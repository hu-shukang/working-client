import { EmployeeInfo } from '@/models/user.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const info = ref<EmployeeInfo>();
  const accessToken = ref<string>();
  const refreshToken = ref<string>();
  const loading = ref(false);

  const $reset = () => {
    info.value = undefined;
    accessToken.value = undefined;
    refreshToken.value = undefined;
    loading.value = false;
  };

  return { $reset, info, accessToken, refreshToken, loading };
});
