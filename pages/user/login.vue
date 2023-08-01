<template>
  <div>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"> </GoogleSignInButton>
  </div>
</template>

<script setup lang="ts">
  import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';

  definePageMeta({
    layout: 'empty'
  });

  // handle success event
  const handleLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    const { data: resp } = await useFetch(`${process.env.API_BASE_URL}/user_attributes`, {
      method: 'PUT',
      body: {
        type: 'Google',
        idToken: credential
      }
    });
    console.log(resp.value);
  };

  // handle an error event
  const handleLoginError = () => {
    console.error('Login failed');
  };
</script>
