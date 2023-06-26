<template>
  <tr>
    <td class="text-center date">{{ date }}</td>
    <td :class="{ 'text-center weekday': true, weekend: isHolidayOrWeekend }">{{ weekday }}</td>
    <td class="text-center start">{{ row.start }}</td>
    <td class="text-center end">{{ row.end }}</td>
    <td class="text-center break">{{ row.break }}</td>
    <td class="text-center night-break">{{ row.nightBreak == 0 ? '' : row.nightBreak }}</td>
    <td class="text-center actual-working">{{ actualWorking }}</td>
    <td class="text-center settlement">{{ settlement }}</td>
    <td class="text-center night-overtime">{{ nightOvertime }}</td>
    <td class="text-center time-off">特別休暇</td>
    <td class="text-center remotely">
      <el-icon v-if="row.remotely"><Select /></el-icon>
    </td>
    <td class="text-center transportation-costs"></td>
    <td>リフレッシュ休暇1日目</td>
  </tr>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { AttendanceRowModel } from '~/types/attendance.type';
  import { dateUtil } from '~/utils/date.util';

  const props = defineProps<{ row: AttendanceRowModel }>();

  const date = computed(() => dateUtil.toMMDD(props.row.date));

  const weekday = computed(() => dateUtil.toWeekday(props.row.date));

  const isHolidayOrWeekend = computed(() => dateUtil.isHolidayOrWeekend(props.row.date));

  const actualWorkingMinute = computed(() => dateUtil.calcActualWorking(props.row));
  const actualWorking = computed(() => dateUtil.minuteToHHmm(actualWorkingMinute.value));

  const settlementMinute = computed(() => dateUtil.calcSettlement(actualWorkingMinute.value));
  const settlement = computed(() => dateUtil.minuteToHHmm(settlementMinute.value));

  const nightOvertimeMinute = computed(() => dateUtil.calcNightOvertime(props.row));
  const nightOvertime = computed(() => dateUtil.minuteToHHmm(nightOvertimeMinute.value));
</script>

<style scoped lang="scss">
  .weekend {
    color: var(--el-color-error);
  }
</style>
