<template>
  <AttendanceTable :list="list" />
</template>

<script setup lang="ts">
  import { attendanceList } from '~/types/attendance.type';

  const list = attendanceList();
</script>
