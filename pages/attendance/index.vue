<template>
  <div>
    <div>{{ result }}</div>
    <div>{{ pending }}</div>
    <div>{{ error }}</div>
    <AttendanceTable :list="list" />
  </div>
</template>

<script setup lang="ts">
  import { attendanceList } from '~/types/attendance.type';

  const list = attendanceList();
  const { data: result, pending, error } = await useFetch('https://holidays-jp.github.io/api/v1/2015/date.json');
</script>
