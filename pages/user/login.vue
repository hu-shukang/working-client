<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script setup lang="ts">
  import { googleAuthCodeLogin } from 'vue3-google-login';
  import { TokenResponse } from 'types/user.type';
  import { useIndexStore } from '@/stores/index.store';

  const indexStore = useIndexStore();
  const { post } = useHttp();
  const router = useRouter();

  const login = async () => {
    indexStore.startLoading();
    const result = await googleAuthCodeLogin();
    const body = { provider: 'google', code: result.code };
    const resp = await post<TokenResponse>('/user/token', { body: body });
    indexStore.employeeInfo = resp.info;
    indexStore.certification = resp.tokens;
    if (resp.info.signupStatus === ConstUtil.PENDING) {
      router.replace('/user/signup');
    } else {
      router.replace('/');
    }
  };
</script>
