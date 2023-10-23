<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/attendance' }">
      勤務表
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="backRoute"> 勤務表作成 </el-breadcrumb-item>
    <el-breadcrumb-item>書き込み</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表【{{ date }}】の書き込み</span>
      </div>
    </template>
    <div v-loading="loading" class="loading">
      <AttendanceForm
        v-model="form"
        :traffic-list="trafficList"
        :yyyymm="date"
        @add-traffic="addTrafficHandler"
        @save="save"
        @back="back"
      />
    </div>
  </el-card>
  <el-dialog v-model="processDialogVisible" title="送信中" width="400px">
    <div class="process-wrapper">
      <div v-for="item of processList" :key="item.date" class="process">
        <el-icon :color="PROCESS_INFOS[item.process].color">
          <SuccessFilled v-if="item.process == 'finish'" />
          <CircleCloseFilled v-else-if="item.process == 'error'" />
          <Promotion v-else-if="item.process == 'processing'" />
          <Timer v-else />
        </el-icon>
        <span>{{
          item.date + 'の勤務情報：' + PROCESS_INFOS[item.process].message
        }}</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :disabled="!processBtnEnable"
          @click="processDialogVisible = false"
        >
          OK
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Const, ROUTE_NAMES, dateUtil, PROCESS_INFOS } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrafficStore } from '@/stores/traffic.store';
import { storeToRefs } from 'pinia';
import { useHttp } from '@/hooks';
import { AttendanceItemFormModel, Process, TrafficItemModel } from '@/models';
import AttendanceForm from '@/components/attendance/AttendanceForm.vue';
import { useAttendanceStore } from '@/stores/attendance.store';
import {
  SuccessFilled,
  CircleCloseFilled,
  Promotion,
  Timer,
} from '@element-plus/icons-vue';
import { computed } from 'vue';

const attendanceStore = useAttendanceStore();
const trafficStore = useTrafficStore();
const { trafficList } = storeToRefs(trafficStore);
const route = useRoute();
const router = useRouter();
const { post, get, loading } = useHttp();
const date = route.params.date as string;
const year = date.split('-')[0];
const processDialogVisible = ref(false);
const processList = ref<Process[]>([]);
const processBtnEnable = computed(() => {
  return processList.value
    .map((item) => item.process)
    .every((item) => ['finish', 'error'].includes(item));
});
const backRoute = {
  name: ROUTE_NAMES.ATTENDANCE_PAGE,
  params: {
    date: date,
  },
};

const form = ref<AttendanceItemFormModel>({
  dateRange: [],
  skipHoliday: true,
  start: '09:00',
  end: '18:00',
  break: 60,
  nightBreak: undefined,
  timeOff: undefined,
  remotely: false,
  comment: undefined,
  routeIds: [],
});

const addTrafficHandler = async (traffic: TrafficItemModel) => {
  trafficList.value.push(traffic);
  form.value.routeIds.push(traffic.routeId);
  form.value.comment = traffic.comment;
};

const back = () => {
  router.push(backRoute);
};

const save = async (type: 'date' | 'dates' | 'daterange') => {
  let dateRange = form.value.dateRange;
  if (!Array.isArray(dateRange)) {
    dateRange = [dateRange];
  }
  if (type === 'daterange') {
    dateRange = [];
    let start = dateUtil.get(form.value.dateRange[0]).startOf('day');
    const end = dateUtil.get(form.value.dateRange[1]).startOf('day');
    while (start.isSame(end) || start.isBefore(end)) {
      dateRange.push(start.toDate());
      start = start.add(1, 'day');
    }
  }
  if (form.value.skipHoliday) {
    dateRange = dateRange.filter((item) => {
      const d = dateUtil.get(item);
      return (
        ![6, 0].includes(d.day()) &&
        !attendanceStore.holiday[year][d.format(Const.FORMAT_YYYY_MM_DD)]
      );
    });
  }
  processList.value = dateRange.map((item) => ({
    date: dateUtil.get(item).format(Const.FORMAT_YYYY_MM_DD),
    process: 'waiting',
  }));
  processDialogVisible.value = true;
  for (let i = 0; i < dateRange.length; i++) {
    const d = dateUtil.get(dateRange[i]);
    processList.value[i].process = 'processing';
    const body: any = {
      date: d.format(Const.FORMAT_YYYY_MM_DD),
      start: form.value.start,
      end: form.value.end,
      break: form.value.break,
      nightBreak: form.value.nightBreak,
      timeOff: form.value.timeOff,
      remotely: form.value.remotely,
      comment: form.value.comment,
      trafficList: [],
    };
    for (let j = 0; j < form.value.routeIds.length; j++) {
      const traffic = trafficList.value.find(
        (item) => item.routeId === form.value.routeIds[j],
      );
      if (traffic) {
        const trafficBody = {
          startStation: traffic.startStation,
          endStation: traffic.endStation,
          tractStation: traffic.tractStation,
          roundTrip: traffic.roundTrip,
          comment: traffic.comment,
        };
        body.trafficList.push(trafficBody);
      }
    }
    try {
      await post('/attendance', body, { withGlobalLoading: false });
      processList.value[i].process = 'finish';
    } catch (e: any) {
      processList.value[i].process = 'error';
    }
  }
  // back();
};

onMounted(async () => {
  if (trafficList.value.length === 0) {
    const result = await get<TrafficItemModel[]>('/traffic', {
      withGlobalLoading: false,
    });
    trafficList.value = result.data;
  }
  if (!attendanceStore.holiday[year]) {
    const holidayList = await dateUtil.getHoliday(year);
    attendanceStore.holiday = { [year]: holidayList };
  }
});
</script>

<style scoped lang="scss">
.process-wrapper {
  padding-left: 30px;
  .process {
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 16px;
    span {
      margin-left: 10px;
    }
  }
}
</style>
