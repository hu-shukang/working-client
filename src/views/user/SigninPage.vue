<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script setup lang="ts">
import { googleAuthCodeLogin } from 'vue3-google-login';
import { useHttp } from '@/hooks';
import { TokenResponse } from '@/models/user.model';
import { useGlobalStore } from '@/stores/global.store';
import { useRouter } from 'vue-router';
import { Const } from '@/utils';

const globalStore = useGlobalStore();
const { post } = useHttp();
const router = useRouter();

const login = async () => {
  const resp = await googleAuthCodeLogin();
  const body = {
    provider: 'google',
    code: resp.code,
  };
  const tokenResp = await post<TokenResponse>('/user/token', body, {
    withGlobalLoading: true,
  });
  globalStore.info = tokenResp.data.info;
  globalStore.accessToken = tokenResp.data.tokens.accessToken;
  globalStore.refreshToken = tokenResp.data.tokens.refreshToken;
  if (globalStore.info.signupStatus === Const.FINISH) {
    router.replace('/');
  } else {
    router.replace('/user/sign-up');
  }
};
</script>
