<template>
  <div class="chart-footer">
    <div class="comment">※ {{ comment }}</div>
    <el-link v-if="more" class="more" type="primary">もっと</el-link>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ comment: string; more?: string }>();
</script>

<style scoped lang="scss">
  .chart-footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .comment {
      color: var(--el-text-color-secondary);
      font-size: 11px;
    }
    .more {
      font-size: 11px;
    }
  }
</style>
