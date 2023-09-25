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
  padding: var(--common-padding);
  background-color: var(--el-color-info-light-9);
  min-height: calc(100vh - var(--header-height));
  box-sizing: border-box;
}
</style>
