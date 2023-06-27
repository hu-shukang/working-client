<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item>勤怠表</el-breadcrumb-item>
    </el-breadcrumb>
    <AttendanceTable v-model="list" :holidays="holidays" />
  </div>
</template>

<script setup lang="ts">
  import { attendanceList } from '~/types/attendance.type';

  const list = ref(attendanceList());
  const { data: holidays } = await useAsyncData('holidays', () => {
    return queryContent('/holidays/2023').findOne();
  });
</script>
