<template>
  <div>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"> </GoogleSignInButton>
  </div>
</template>

<script setup lang="ts">
  import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';
  import { AuthResult } from '~/types/certification.type';

  definePageMeta({
    layout: 'empty'
  });

  const config = useRuntimeConfig();

  // handle success event
  const handleLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    const { data: resp } = await useFetch<AuthResult>(`${config.public.apiBase}/certification/signin`, {
      method: 'POST',
      body: {
        type: 'Google',
        idToken: credential + 'af'
      }
    });
    console.log(resp.value?.AccessToken);
  };

  // handle an error event
  const handleLoginError = () => {
    console.error('Login failed');
  };
</script>
