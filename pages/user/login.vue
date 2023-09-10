<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script setup lang="ts">
  import { googleAuthCodeLogin } from 'vue3-google-login';
  import { useIndexStore } from '@/stores/index.store';

  const indexStore = useIndexStore();
  const { post } = useHttp();

  const login = async () => {
    indexStore.startLoading();
    const result = await googleAuthCodeLogin();
    const body = { provider: 'google', code: result.code };
    const resp = await post<any>('/user/token', { body: body });
    indexStore.employeeInfo = resp.info;
    delete resp.info;
    indexStore.certification = resp;
    // loading.value = false;
  };
</script>
