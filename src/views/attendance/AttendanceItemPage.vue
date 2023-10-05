<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/attendance' }">
      勤務表
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: `/attendance/${date}/add` }">
      勤務表作成
    </el-breadcrumb-item>
    <el-breadcrumb-item>書き込み</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表【{{ date }}】の書き込み</span>
      </div>
    </template>
    <Calendar v-model="range" year-month="2023-09" type="range" />
    <el-form class="attendance-write-form" :model="form" label-width="100px">
      <el-form-item label="期間" prop="range">
        <el-date-picker
          v-model="form.range"
          type="daterange"
          range-separator="〜"
          start-placeholder="開始日"
          end-placeholder="終了日"
          :disabled-date="disabledDate"
        />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Const, dateUtil } from '@/utils';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Calendar from '@/components/common/Calendar/Calendar.vue';

const route = useRoute();
const date = route.params.date as string;
const range = ref([]);
const form = reactive({
  range: [],
  withWeekend: false,
  start: '',
  end: '',
  break: undefined,
  nightBreak: undefined,
  timeOff: undefined,
  remotely: undefined,
  comment: undefined,
  withTraffic: false,
  startStation: undefined,
  endStation: undefined,
  tractStation: [],
  roundTrip: undefined,
  trafficComment: undefined,
});

const disabledDate = (value: Date): boolean => {
  return date != dateUtil.get(value).format(Const.FORMAT_YYYY_MM);
};

onMounted(() => {});
</script>
