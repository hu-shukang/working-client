<template>
  <Header />
  <div class="main-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue';
</script>

<style scoped lang="scss">
.main-container {
  padding: var(--common-padding) 0;
  min-height: calc(100vh - var(--header-height));
  box-sizing: border-box;
  max-width: min(1200px, 90%);
  margin: 0 auto;
}
</style>
