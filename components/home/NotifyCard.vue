<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>お知らせ</span>
        <el-button link type="primary" class="button" text>more</el-button>
      </div>
    </template>
    <NotifyItem
      v-for="notify in notifyList"
      :key="notify.id"
      :notify="notify"
    />
  </el-card>
</template>

<script setup lang="ts">
  import { notifyData } from '~/types/home.type';
  import { ref } from 'vue';

  const notifyList = ref(notifyData());
</script>

<style scoped lang="scss"></style>
