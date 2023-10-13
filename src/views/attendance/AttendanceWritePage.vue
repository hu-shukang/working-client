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
</template>

<script setup lang="ts">
import { Const, ROUTE_NAMES, dateUtil } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTrafficStore } from '@/stores/traffic.store';
import { storeToRefs } from 'pinia';
import { useHttp } from '@/hooks';
import { AttendanceItemFormModel, TrafficItemModel } from '@/models';
import AttendanceForm from '@/components/attendance/AttendanceForm.vue';

const trafficStore = useTrafficStore();
const { trafficList } = storeToRefs(trafficStore);
const route = useRoute();
const router = useRouter();
const { post, get, loading } = useHttp();
const date = route.params.date as string;
const backRoute = {
  name: ROUTE_NAMES.ATTENDANCE_PAGE,
  params: {
    date: date,
  },
};

const form = ref<AttendanceItemFormModel>({
  withWeekend: false,
  dateRange: [],
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

const save = async () => {
  let dateRange = form.value.dateRange;
  if (!Array.isArray(dateRange)) {
    dateRange = [dateRange];
  }
  for (let i = 0; i < dateRange.length; i++) {
    const d = dateUtil.get(dateRange[i]);
    if (!form.value.withWeekend && [6, 0].includes(d.day())) {
      continue;
    }
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
    await post('/attendance', body, { withGlobalLoading: false });
  }
  back();
};

onMounted(async () => {
  if (trafficList.value.length === 0) {
    const result = await get<TrafficItemModel[]>('/traffic', {
      withGlobalLoading: false,
    });
    trafficList.value = result.data;
  }
});
</script>
