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
    <!-- <Calendar v-model="range" year-month="2023-09" type="range" /> -->
    <el-form class="attendance-write-form" :model="form" label-width="100px">
      <el-form-item label="日付選択方式" prop="type">
        <el-radio-group :model-value="type" @change="typeHandler">
          <el-radio label="date">単一</el-radio>
          <el-radio label="dates">複数</el-radio>
          <el-radio label="daterange">範囲</el-radio>
        </el-radio-group>
        <div class="comment">
          <ul>
            <li>単一：シングルの日付を選択できます。</li>
            <li>複数：複数の日付を一括で選択できます。</li>
            <li>範囲：開始日と終了日を指定して範囲で選択できます。</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="日付" prop="range">
        <el-date-picker
          v-model="form.dateRange"
          :type="type"
          :placeholder="placeholder[type]"
          start-placeholder="開始日"
          end-placeholder="終了日"
          :default-value="defaultDate"
          :disabled-date="disabledDate"
        />
      </el-form-item>
      <el-form-item label="出勤時刻" prop="start">
        <el-time-select
          v-model="form.start"
          start="00:00"
          end="23:45"
          step="00:15"
          placeholder="出勤時刻"
        />
      </el-form-item>
      <el-form-item label="退勤時刻" prop="end">
        <el-time-select
          v-model="form.end"
          start="00:00"
          end="23:45"
          step="00:15"
          placeholder="退勤時刻"
        />
      </el-form-item>
      <el-form-item label="昼間休憩" prop="break">
        <el-input
          v-model.number="form.break"
          class="min-length"
          placeholder="昼間休憩"
        >
          <template #append>分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="夜間休憩" prop="nightBreak">
        <el-input
          v-model.number="form.nightBreak"
          class="min-length"
          placeholder="夜間休憩"
        >
          <template #append>分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="休暇" prop="timeOff">
        <el-select v-model="form.timeOff" clearable placeholder="休暇">
          <el-option label="item.label" value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="在宅" prop="remotely">
        <el-switch
          v-model="form.remotely"
          :active-icon="Check"
          :inactive-icon="Close"
          inline-prompt
        />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Const, dateUtil } from '@/utils';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Check, Close } from '@element-plus/icons-vue';

const route = useRoute();
const date = route.params.date as string;
const defaultDate = dateUtil.get(`${date}-01`).toDate();
const type = ref('date');
const placeholder: { [key: string]: string } = {
  date: '単一の日付を選択',
  dates: '複数の日付を選択',
  daterange: '範囲を選択',
};
const form = reactive({
  withWeekend: false,
  dateRange: [],
  start: '09:00',
  end: '18:00',
  break: 60,
  nightBreak: undefined,
  timeOff: undefined,
  remotely: false,
  comment: undefined,
  withTraffic: false,
  startStation: undefined,
  endStation: undefined,
  tractStation: [],
  roundTrip: undefined,
  trafficComment: undefined,
});

const typeHandler = (value: string) => {
  form.dateRange = [];
  type.value = value;
};

const disabledDate = (value: Date): boolean => {
  return date != dateUtil.get(value).format(Const.FORMAT_YYYY_MM);
};

onMounted(() => {});
</script>
