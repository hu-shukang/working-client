<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/management' }">管理者</el-breadcrumb-item>
      <el-breadcrumb-item>部門</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tool-bar">
      <div>部門</div>
      <div class="flex-grow-1"></div>
      <el-button type="danger" plain :icon="Delete">削除</el-button>
      <el-button type="warning" plain :icon="Edit">編集</el-button>
      <el-button type="primary" plain :icon="Plus">新規</el-button>
    </div>
    <Tree :node="node" />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { TrafficRowModel } from '~/types/traffic.type';
  import { useReportStore } from '~/stores/report.store';
  import { initDepartmentTree } from '~/types/management.type';

  const attendanceStore = useReportStore();
  const node = initDepartmentTree();
  // const addDialogVisiable = ref(false);
  // const editDialogVisiable = ref(false);

  const list = computed({
    get: () => attendanceStore.trafficList,
    set: (value: TrafficRowModel[]) => {
      attendanceStore.trafficList = value;
    }
  });

  const resetCheck = () => {
    list.value.forEach((item) => (item.checked = false));
  };

  onUnmounted(() => {
    resetCheck();
  });
</script>
