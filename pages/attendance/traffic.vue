<template>
  <div>
    <div class="tool-bar">
      <div>通勤経路</div>
      <div class="flex-grow-1"></div>
      <el-button type="danger" plain :icon="Delete" @click="remove">削除</el-button>
      <el-button type="warning" plain :icon="Edit" @click="edit">編集</el-button>
      <el-button type="primary" plain :icon="Plus" @click="add">新規</el-button>
    </div>
    <TrafficTable v-model="list" />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { TrafficRowModel } from '~/types/traffic.type';
  import { useAttendanceStore } from '~/stores/attendance.store';

  const attendanceStore = useAttendanceStore();

  const list = computed({
    get: () => attendanceStore.trafficList,
    set: (value: TrafficRowModel[]) => {
      attendanceStore.trafficList = value;
    }
  });

  const remove = () => {};

  const edit = () => {};

  const add = () => {};
</script>

<style scoped lang="scss">
  .tool-bar {
    margin-bottom: var(--el-secounday-padding);
    display: flex;
    align-items: center;
  }
</style>
