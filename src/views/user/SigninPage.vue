<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script setup lang="ts">
import { googleAuthCodeLogin } from 'vue3-google-login';

const login = async () => {
  const resp = await googleAuthCodeLogin();
  const code = resp.code;
  console.log(code);
};
</script>
