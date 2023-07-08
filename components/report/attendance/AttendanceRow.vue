<template>
  <tr>
    <td class="text-center check">
      <el-checkbox v-model="checked" />
    </td>
    <td class="text-center date">{{ date }}</td>
    <td :class="{ 'text-center weekday': true, weekend: isWeekend, holiday: holiday != null }">
      <el-tooltip class="box-item" effect="dark" :content="holiday" placement="right" :disabled="holiday == null">
        <div>{{ weekday }}</div>
      </el-tooltip>
    </td>
    <td class="text-center start">{{ row.start }}</td>
    <td class="text-center end">{{ row.end }}</td>
    <td class="text-center break">{{ row.break == 0 ? '' : row.break }}</td>
    <td class="text-center night-break">{{ row.nightBreak == 0 ? '' : row.nightBreak }}</td>
    <td class="text-center actual-working">{{ actualWorking }}</td>
    <td class="text-center settlement">{{ settlement }}</td>
    <td class="text-center night-overtime">{{ nightOvertime }}</td>
    <td class="text-center time-off">{{ timeOff }}</td>
    <td class="text-center remotely">
      <el-icon v-if="row.remotely"><Select /></el-icon>
    </td>
    <td class="text-center transportation-costs"></td>
    <td>{{ row.comment }}</td>
  </tr>
</template>

<script setup lang="ts">
  import { ParsedContent } from '@nuxt/content/dist/runtime/types';
  import { computed } from 'vue';
  import { AttendanceRowModel } from '~/types/attendance.type';
  import { dateUtil } from '~/utils/date.util';
  import { ConstUtil } from '~/utils/const.util';

  const props = defineProps<{ index: number; row: AttendanceRowModel; holidays: ParsedContent | null }>();
  const emit = defineEmits(['check']);

  const checked = computed({
    get: () => props.row.checked,
    set: (value: boolean) => emit('check', props.index, value)
  });

  const timeOffOptions = ConstUtil.TIME_OFF_OPTIONS;
  const date = computed(() => dateUtil.toMMDD(props.row.date));
  const yyyymmdd = computed(() => dateUtil.toYYYYMMDD(props.row.date));

  const timeOff = computed(() => {
    const t = timeOffOptions.find((o) => o.value === props.row.timeOff);
    if (t) {
      return t.label;
    }
    return '';
  });

  const weekday = computed(() => dateUtil.toWeekday(props.row.date));

  const isWeekend = computed(() => dateUtil.isWeekend(props.row.date));

  const holiday = computed(() => (props.holidays === null ? null : props.holidays[yyyymmdd.value]));

  const actualWorkingMinute = computed(() => dateUtil.calcActualWorking(props.row));
  const actualWorking = computed(() => dateUtil.minuteToHHmm(actualWorkingMinute.value));

  const settlementMinute = computed(() => dateUtil.calcSettlement(actualWorkingMinute.value));
  const settlement = computed(() => dateUtil.minuteToHHmm(settlementMinute.value));

  const nightOvertimeMinute = computed(() => dateUtil.calcNightOvertime(props.row));
  const nightOvertime = computed(() => dateUtil.minuteToHHmm(nightOvertimeMinute.value));
</script>

<style scoped lang="scss">
  .weekend {
    background-color: var(--el-color-warning-light-5);
  }

  .holiday {
    background-color: var(--el-color-error-light-5);
  }
</style>
