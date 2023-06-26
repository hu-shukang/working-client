<template>
  <div class="notify-item">
    <div class="title">{{ notify.title }}</div>
    <div class="create-time">{{ notify.createTime }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Notify } from '~/types/home.type';
  defineProps<{ notify: Notify }>();
</script>

<style scoped lang="scss">
  .notify-item {
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 23px;
    font-size: 14px;
    .create-time {
      color: var(--el-color-info-light-5);
    }
  }
</style>
