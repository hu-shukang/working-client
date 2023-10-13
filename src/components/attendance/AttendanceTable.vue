<template>
  <el-table :data="list" border @selection-change="handleSelectionChange">
    <el-table-column
      v-if="withCheck"
      type="selection"
      width="44"
      align="center"
    />
    <el-table-column prop="date.value" label="日付" width="66" align="center" />
    <el-table-column label="曜日" width="60" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.date.isSaturday" type="warning">
          {{ scope.row.date.weekday }}
        </el-tag>
        <el-tag v-else-if="scope.row.date.isSunday" type="danger">
          {{ scope.row.date.weekday }}
        </el-tag>
        <el-tag v-else>{{ scope.row.date.weekday }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="start" label="出勤時刻" width="76" align="center" />
    <el-table-column prop="end" label="退勤時刻" width="76" align="center" />
    <el-table-column prop="break" label="通常休憩" width="76" align="center">
      <template #default="scope">
        <span v-if="scope.row.break">{{ scope.row.break + '分' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="nightBreak"
      label="深夜休憩"
      width="76"
      align="center"
    >
      <template #default="scope">
        <span v-if="scope.row.nightBreak">
          {{ scope.row.nightBreak + '分' }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="実働時間" width="76" align="center">
      <template #default="scope">
        {{ getActualWorkingTime(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column prop="start" label="精算時間" width="76" align="center">
      <template #default="scope">
        {{ getCalculateWorkingTime(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column label="深夜残業" width="76" align="center">
      <template #default="scope">
        {{ getNightOvertime(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column prop="timeOff" label="休暇" width="60" align="center" />
    <el-table-column label="在宅" width="60" align="center">
      <template #default="scope">
        <el-icon v-if="scope.row.remotely"><Select /></el-icon>
      </template>
    </el-table-column>
    <el-table-column width="90">
      <template #header>
        <div class="custom-table-header">
          <span>交通費</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="交通費の金額を押下すれば、詳細をご確認できます。"
            placement="top"
          >
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>
      <template #default="scope">
        <el-link
          v-if="scope.row.trafficList.length > 0"
          type="primary"
          @click="trafficClickHandler(scope.row)"
        >
          {{ getTrafficTotalCoust(scope.row.trafficList) }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="備考">
      <template #default="scope">
        <div v-auto-font-size class="auto-font-size">
          {{ scope.row.comment }}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="交通費明細" width="1100px">
    <TrafficTable
      :traffic-list="trafficList"
      :with-control="false"
      :with-month-train-pass="false"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { QuestionFilled, Select } from '@element-plus/icons-vue';
import { AttendanceTraffic, AttendanceViewItem } from '@/models';
import { PropType, ref } from 'vue';
import { dateUtil, stringUtil } from '@/utils';
import TrafficTable from '../traffic/TrafficTable.vue';

defineProps({
  list: {
    type: Array as PropType<AttendanceViewItem[]>,
    required: true,
  },
  withCheck: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emits = defineEmits(['selection-change']);

const trafficList = ref<AttendanceTraffic[]>([]);
const dialogVisible = ref(false);
const handleSelectionChange = (val: AttendanceViewItem[]) => {
  emits('selection-change', val);
};

const getNightOvertime = (item: AttendanceViewItem) => {
  const { start, end, nightBreak } = item;
  if (start === '' || end === '') {
    return '';
  }
  const earlyMorningOvertime = dateUtil.calcMinutesInRange(start, end, [
    '00:00',
    '05:00',
  ]);
  const nightOvertime = dateUtil.calcMinutesInRange(start, end, [
    '22:00',
    '24:00',
  ]);
  const minutes = earlyMorningOvertime + nightOvertime - (nightBreak ?? 0);
  return dateUtil.formatMinutes(minutes);
};

const getCalculateWorkingTime = (item: AttendanceViewItem) => {
  if (item.start === '' || item.end === '') {
    return '';
  }
  let minutes = dateUtil.calcMinutesInRange(item.start, item.end);
  minutes = minutes - (item.break ?? 0) - (item.nightBreak ?? 0);
  minutes = Math.floor(minutes / 15) * 15;
  return dateUtil.formatMinutes(minutes);
};

const getActualWorkingTime = (item: AttendanceViewItem) => {
  if (item.start === '' || item.end === '') {
    return '';
  }
  let minutes = dateUtil.calcMinutesInRange(item.start, item.end);
  minutes = minutes - (item.break ?? 0) - (item.nightBreak ?? 0);
  return dateUtil.formatMinutes(minutes);
};

const getTrafficTotalCoust = (trafficList: AttendanceTraffic[]) => {
  const result = trafficList
    .map((item: any) => item.roundTrip)
    .reduce((x: number, y: number) => x + y, 0);
  return stringUtil.formatMoney(result);
};

const trafficClickHandler = (item: AttendanceViewItem) => {
  trafficList.value = item.trafficList;
  dialogVisible.value = true;
};
</script>
