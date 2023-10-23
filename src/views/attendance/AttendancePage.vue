<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/attendance' }">
      勤務表
    </el-breadcrumb-item>
    <el-breadcrumb-item>勤務表作成</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表【{{ date }}】</span>
        <div>
          <el-button type="danger" :icon="Delete" @click="clear">
            クリア
          </el-button>
          <el-button type="primary" :icon="Plus" @click="toWritePage">
            書き込み
          </el-button>
        </div>
      </div>
    </template>
    <div v-loading="loading" class="loading">
      <AttendanceTable
        v-if="attendanceList.length !== 0"
        :list="attendanceList"
        :holiday="attendanceStore.holiday[year]"
        :with-check="true"
        @selection-change="handleSelectionChange"
      />
      <AttendanceSummary
        v-if="attendanceList.length !== 0"
        :data="attendanceSummaryModel"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {
  AttendanceRespItem,
  AttendanceSummaryModel,
  AttendanceViewItem,
  DateInfo,
} from '@/models';
import { ROUTE_NAMES, dateUtil } from '@/utils';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Plus, Delete } from '@element-plus/icons-vue';
import { useHttp } from '@/hooks';
import { ElMessageBox, ElNotification } from 'element-plus';
import AttendanceTable from '@/components/attendance/AttendanceTable.vue';
import AttendanceSummary from '@/components/attendance/AttendanceSummary.vue';
import { useAttendanceStore } from '@/stores/attendance.store';

const router = useRouter();
const route = useRoute();
const date = route.params.date as string;
const year = date.split('-')[0];
const attendanceList = ref<AttendanceViewItem[]>([]);
const selection = ref<DateInfo[]>([]);
const attendanceStore = useAttendanceStore();
const { get, del, loading } = useHttp();

const attendanceSummaryModel = computed<AttendanceSummaryModel>(() => {
  let totalActualWorkingTime = 0;
  let totalCalculateWorkingTime = 0;
  let totalNightOvertime = 0;
  let remotelyCount = 0;
  let totalRoundTrip = 0;
  for (const item of attendanceList.value) {
    totalActualWorkingTime += item.actualWorkingTime ?? 0;
    totalCalculateWorkingTime += item.calculateWorkingTime ?? 0;
    totalNightOvertime += item.nightOvertime ?? 0;
    remotelyCount += item.remotely ? 1 : 0;
    totalRoundTrip += item.totalTraffic ?? 0;
  }
  return {
    date: route.params.date as string,
    totalActualWorkingTime: totalActualWorkingTime,
    totalCalculateWorkingTime: totalCalculateWorkingTime,
    totalNightOvertime: totalNightOvertime,
    remotelyCount: remotelyCount,
    totalRoundTrip: totalRoundTrip,
  };
});

const initAttendanceItem = (dateInfo: DateInfo) => {
  return { date: dateInfo, start: '', end: '', trafficList: [] };
};

const toAttendanceItem = (dateInfo: DateInfo, respItem: AttendanceRespItem) => {
  const result: AttendanceViewItem = {
    ...respItem,
    date: dateInfo,
    actualWorkingTime: dateUtil.getActualWorkingTime(respItem),
    calculateWorkingTime: dateUtil.getCalculateWorkingTime(respItem),
    nightOvertime: dateUtil.getNightOvertime(respItem),
    totalTraffic: respItem.trafficList
      .map((item: any) => item.roundTrip)
      .reduce((x: number, y: number) => x + y, 0),
  };
  return result;
};

const getAttendanceList = (
  items: AttendanceRespItem[],
): AttendanceViewItem[] => {
  const dateInfoList = dateUtil.getDateInfoList(date);
  const result: AttendanceViewItem[] = [];
  let idx = 0;
  for (const dateInfo of dateInfoList) {
    if (idx === items.length || dateInfo.yyyyMMDD !== items[idx].date) {
      result.push(initAttendanceItem(dateInfo));
    } else {
      result.push(toAttendanceItem(dateInfo, items[idx++]));
    }
  }
  return result;
};

const handleSelectionChange = (val: AttendanceViewItem[]) => {
  selection.value = val.map((item) => item.date);
};

const requestAttendance = async () => {
  const resp = await get<AttendanceRespItem[]>(`/attendance/${date}`, {
    withGlobalLoading: false,
  });
  attendanceList.value = getAttendanceList(resp.data);
};

const clear = async () => {
  if (selection.value.length === 0) {
    ElNotification({
      title: '警告',
      message: '一つ以上を選択する必要があります。',
      type: 'warning',
    });
    return;
  }
  const target = selection.value
    .map((item) => `<li>・${item.yyyyMMDD}</li>`)
    .join('');
  try {
    await ElMessageBox.confirm(
      `<div>下記の日付の勤務記録を削除してよろしいですか？</div><ul>${target}</ul>`,
      'ご確認',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true,
      },
    );
    for (const item of selection.value) {
      await del(`/attendance/${item.yyyyMMDD}`, { withGlobalLoading: false });
    }
    await requestAttendance();
  } catch (e: any) {
    console.log(e);
  }
};

const toWritePage = () => {
  router.push({
    name: ROUTE_NAMES.ATTENDANCE_WRITE_PAGE,
    params: {
      date: date,
    },
  });
};

onMounted(async () => {
  await requestAttendance();
  if (!attendanceStore.holiday[year]) {
    const holidayList = await dateUtil.getHoliday(year);
    attendanceStore.holiday = { [year]: holidayList };
  }
});
</script>
