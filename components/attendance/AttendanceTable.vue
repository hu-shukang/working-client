<template>
  <div>
    <el-descriptions class="attendance-descriptions pb-secounday" :column="6" border>
      <el-descriptions-item label="標準稼働">22</el-descriptions-item>
      <el-descriptions-item label="出勤日数" :span="5">17</el-descriptions-item>
      <el-descriptions-item label="有休">2.0</el-descriptions-item>
      <el-descriptions-item label="半有休">2.0</el-descriptions-item>
      <el-descriptions-item label="振替休日">0.0</el-descriptions-item>
      <el-descriptions-item label="特別休暇">0.0</el-descriptions-item>
      <el-descriptions-item label="欠勤">0.0</el-descriptions-item>
      <el-descriptions-item label="休暇合計">0.0</el-descriptions-item>
      <el-descriptions-item label="休日出勤">0.0</el-descriptions-item>
      <el-descriptions-item label="振替出勤">0.0</el-descriptions-item>
      <el-descriptions-item label="遅刻">0.0</el-descriptions-item>
      <el-descriptions-item label="早退">0.0</el-descriptions-item>
      <el-descriptions-item label="その他">0.0</el-descriptions-item>
    </el-descriptions>
    <table class="tbl stick">
      <thead>
        <tr>
          <th class="check" rowspan="2">
            <el-checkbox v-model="allCheck" :indeterminate="isIndeterminate" />
          </th>
          <th class="date" rowspan="2">日付</th>
          <th class="weekday" rowspan="2">曜日</th>
          <th colspan="2">時刻</th>
          <th class="break" rowspan="2">通常休憩<br />(単位: 分)</th>
          <th class="night-break" rowspan="2">深夜休憩<br />(単位: 分)</th>
          <th class="actual-working" rowspan="2">実働時間</th>
          <th class="settlement" rowspan="2">精算時間</th>
          <th class="night-overtime" rowspan="2">深夜残業</th>
          <th class="time-off" rowspan="2">休暇</th>
          <th rowspan="2">備考欄<br />(遅刻・早退理由)</th>
        </tr>
        <tr>
          <th class="start">出社</th>
          <th class="end">退社</th>
        </tr>
      </thead>
    </table>
    <el-scrollbar class="scroll-bar" :always="true">
      <table class="tbl stick">
        <tbody>
          <AttendanceRow
            v-for="(row, index) in modelValue"
            :key="row.date"
            :index="index"
            :row="row"
            :holidays="holidays"
            @check="check"
          />
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { ParsedContent } from '@nuxt/content/dist/runtime/types';
  import { AttendanceRowModel } from '~/types/attendance.type';

  const props = defineProps<{ modelValue: AttendanceRowModel[]; holidays: ParsedContent | null }>();
  const emit = defineEmits(['update:modelValue']);

  const check = (index: number, value: boolean) => {
    const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as AttendanceRowModel[];
    newModelValue[index].checked = value;
    emit('update:modelValue', newModelValue);
  };

  const isIndeterminate = computed(
    () => props.modelValue.some((item) => item.checked) && props.modelValue.some((item) => !item.checked)
  );

  const allCheck = computed({
    get: () => props.modelValue.every((item) => item.checked),
    set: (value: boolean) => {
      const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as AttendanceRowModel[];
      for (let i = 0; i < newModelValue.length; i++) {
        newModelValue[i].checked = value;
      }
      emit('update:modelValue', newModelValue);
    }
  });
</script>

<style scoped lang="scss">
  .scroll-bar {
    height: calc(
      100vh - var(--el-header-height) - var(--el-footer-height) - var(--el-main-padding) - var(--el-main-padding) - 34px -
        42px - 64px - 121px - var(--el-secounday-padding)
    );
    min-height: 500px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  .check,
  :deep(.check) {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
  }
  .date,
  :deep(.date) {
    width: 70px;
    max-width: 70px;
    min-width: 70px;
  }
  .weekday,
  :deep(.weekday) {
    width: 32px;
    max-width: 32px;
    min-width: 32px;
  }
  .start,
  :deep(.start) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .end,
  :deep(.end) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .break,
  :deep(.break) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .night-break,
  :deep(.night-break) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .actual-working,
  :deep(.actual-working) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .settlement,
  :deep(.settlement) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .night-overtime,
  :deep(.night-overtime) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .time-off,
  :deep(.time-off) {
    width: 62px;
    max-width: 62px;
    min-width: 62px;
  }
  .el-checkbox,
  :deep(.el-checkbox) {
    height: var(--table-row-default-height);
  }
</style>
