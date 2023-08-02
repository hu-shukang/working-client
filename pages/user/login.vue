<template>
  <div v-loading.fullscreen.lock="loading">
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"> </GoogleSignInButton>
  </div>
</template>

<script setup lang="ts">
  import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';
  import { useIndexStore } from '~/stores/index.store';
  import { useHttp } from '~/composables/use-http';
  import { AuthResult } from '~/types/certification.type';
  import { tokenUtil } from '~/utils/token.util';

  definePageMeta({
    layout: 'empty'
  });

  const loading = ref(false);
  const { post } = useHttp();
  const indexStore = useIndexStore();
  const router = useRouter();

  // handle success event
  const handleLoginSuccess = async (response: CredentialResponse) => {
    loading.value = true;
    const { credential } = response;
    const body = { type: 'Google', idToken: credential };
    try {
      const resp = await post<AuthResult>('/certification/signin', { body: body });
      tokenUtil.decodeAndStore(resp.IdToken);
      indexStore.certification = resp;
      router.replace('/');
    } finally {
      loading.value = false;
    }
  };

  // handle an error event
  const handleLoginError = () => {
    console.error('Login failed');
  };
</script>
