<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item>勤怠表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tool-bar">
      <el-button type="danger" plain :icon="Delete">削除</el-button>
      <el-button type="warning" plain :icon="Edit">編集</el-button>
      <el-button type="primary" plain :icon="Plus">新規</el-button>
    </div>
    <AttendanceTable v-model="list" :holidays="holidays" />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { AttendanceRowModel, emptyAttendanceRowModel } from '~/types/attendance.type';

  const year = ref<number>(2023);
  const month = ref<number>(3);
  const list = ref<AttendanceRowModel[]>([]);

  const resetAttendanceList = (year: number, month: number) => {
    const dayCount = dateUtil.getDayCount(year, month);
    const result: AttendanceRowModel[] = [];
    for (let i = 1; i <= dayCount; i++) {
      const date = dateUtil.getIOSDateString(year, month, i);
      const attendanceRow = emptyAttendanceRowModel(date);
      result.push(attendanceRow);
    }
    list.value = result;
  };

  const { data: holidays, refresh } = await useAsyncData('holidays', () => {
    return queryContent(`/holidays/${year.value}`).findOne();
  });

  onMounted(() => {
    resetAttendanceList(year.value, month.value);
  });

  watch([year, month], ([y, m]) => resetAttendanceList(y, m));
  watch(year, () => refresh());
</script>

<style scoped lang="scss">
  .tool-bar {
    margin-bottom: var(--el-secounday-padding);
    text-align: right;
  }
</style>
