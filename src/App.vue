<template>
  <el-config-provider :locale="local">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import ja from 'element-plus/dist/locale/ja.mjs';

const local = ja;
</script>
