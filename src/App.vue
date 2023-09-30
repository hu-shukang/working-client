<template>
  <el-config-provider :locale="local">
    <div v-loading.fullscreen.lock="loading" class="global-loading">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import ja from 'element-plus/dist/locale/ja.mjs';
import { useGlobalStore } from '@/stores/global.store';
import { computed } from 'vue';

const local = ja;
const globalStore = useGlobalStore();
const loading = computed(() => globalStore.loading);
</script>
