<template>
  <el-container v-loading.fullscreen.lock="loading">
    <el-header>Header</el-header>
    <el-container class="main-container">
      <el-aside>
        <HomeMenu />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts">
  import { useIndexStore } from '~/stores/index.store';

  const indexStore = useIndexStore();
  const loading = computed(() => indexStore.loading);
</script>
