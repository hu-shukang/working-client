<template>
  <div>
    <div class="tbl-stick">
      <table class="tbl stick">
        <thead>
          <tr>
            <th class="date" rowspan="2">日付</th>
            <th class="weekday" rowspan="2">曜日</th>
            <th colspan="2">時刻</th>
            <th class="break" rowspan="2">通常休憩</th>
            <th class="night-break" rowspan="2">深夜休憩</th>
            <th class="actual-working" rowspan="2">実働時間</th>
            <th class="settlement" rowspan="2">精算時間</th>
            <th class="night-overtime" rowspan="2">深夜残業</th>
            <th class="time-off" rowspan="2">休暇</th>
            <th class="remotely" rowspan="2">在宅</th>
            <th class="transportation-costs" rowspan="2">実費<br />通勤費</th>
            <th rowspan="2">備考欄<br />（遅刻・早退理由）</th>
          </tr>
          <tr>
            <th class="start">出社</th>
            <th class="end">退社</th>
          </tr>
        </thead>
      </table>
    </div>
    <table class="tbl stick">
      <tbody>
        <AttendanceRow v-for="row in list" :key="row.date" :row="row" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { AttendanceRowModel } from '~/types/attendance.type';

  defineProps<{ list: AttendanceRowModel[] }>();
</script>

<style scoped lang="scss">
  .tbl-stick {
    top: 60px;
    position: -webkit-sticky;
    position: sticky;
    z-index: 9;
    white-space: nowrap;
  }
  .date,
  :deep(.date) {
    width: 70px;
  }
  .weekday,
  :deep(.weekday) {
    width: 32px;
  }
  .start,
  :deep(.start) {
    width: 40px;
  }
  .end,
  :deep(.end) {
    width: 40px;
  }
  .break,
  :deep(.break) {
    width: 64px;
  }
  .night-break,
  :deep(.night-break) {
    width: 64px;
  }
  .actual-working,
  :deep(.actual-working) {
    width: 64px;
  }
  .settlement,
  :deep(.settlement) {
    width: 64px;
  }
  .night-overtime,
  :deep(.night-overtime) {
    width: 64px;
  }
  .time-off,
  :deep(.time-off) {
    width: 62px;
  }
  .remotely,
  :deep(.remotely) {
    width: 50px;
  }
  .transportation-costs,
  :deep(.transportation-costs) {
    width: 70px;
  }
</style>
