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
    <el-form
      v-loading="loading"
      class="attendance-write-form"
      :model="form"
      label-width="100px"
    >
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
      <el-form-item label="在宅勤務" prop="remotely">
        <el-switch
          v-model="form.remotely"
          :active-icon="Check"
          :inactive-icon="Close"
          inline-prompt
        />
      </el-form-item>
      <el-form-item label="交通ルート" prop="routeId">
        <el-select
          v-model="form.routeIds"
          class="multiple-select"
          multiple
          clearable
          placeholder="交通ルート"
          @change="routeChangeHandler"
        >
          <el-option
            v-for="traffic in trafficListOnlyRoundTrip"
            :key="traffic.routeId"
            :label="traffic.startStation + ' - ' + traffic.endStation"
            :value="traffic.routeId"
          >
            <span style="float: left">
              {{ traffic.startStation + ' - ' + traffic.endStation }}
            </span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
            >
              {{ traffic.roundTrip + '円' }}
            </span>
          </el-option>
        </el-select>
        <el-button
          type="primary"
          :icon="Plus"
          plain
          style="margin-left: 10px"
          @click="trafficFormDialogVisible = true"
        >
          交通ルート追加
        </el-button>
      </el-form-item>
      <el-form-item label="備考">
        <el-input
          v-model="form.comment"
          type="textarea"
          :rows="3"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save"> 書き込み </el-button>
        <el-button @click="back">一覧に戻る</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <TrafficFormDialog
    v-model:visible="trafficFormDialogVisible"
    @submited="submitHandler"
  />
</template>

<script setup lang="ts">
import { Const, dateUtil } from '@/utils';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Check, Close, Plus } from '@element-plus/icons-vue';
import { useTrafficStore } from '@/stores/traffic.store';
import { storeToRefs } from 'pinia';
import { useHttp } from '@/hooks';
import { AttendanceItemFormModel, TrafficItemModel } from '@/models';
import TrafficFormDialog from '@/components/traffic/TrafficFormDialog.vue';

const trafficStore = useTrafficStore();
const { trafficList, trafficListOnlyRoundTrip } = storeToRefs(trafficStore);
const route = useRoute();
const router = useRouter();
const { post, get, loading } = useHttp();
const date = route.params.date as string;
const defaultDate = dateUtil.get(`${date}-01`).toDate();
const type = ref('date');
const trafficFormDialogVisible = ref(false);
const placeholder: { [key: string]: string } = {
  date: '単一の日付を選択',
  dates: '複数の日付を選択',
  daterange: '範囲を選択',
};
const form = reactive<AttendanceItemFormModel>({
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

const typeHandler = (value: string) => {
  form.dateRange = [];
  type.value = value;
};

const disabledDate = (value: Date): boolean => {
  return date != dateUtil.get(value).format(Const.FORMAT_YYYY_MM);
};

const routeChangeHandler = (ids: string[]) => {
  const comment = trafficList.value
    .filter((item) => ids.includes(item.routeId))
    .map((item) => item.comment)
    .filter((item) => item != undefined)
    .join(',');
  form.comment = comment;
};

const submitHandler = async (traffic: TrafficItemModel) => {
  trafficList.value.push(traffic);
  form.routeIds.push(traffic.routeId);
  form.comment = traffic.comment;
};

const back = () => {
  router.push(`/attendance/${date}/add`);
};

const save = async () => {
  let dateRange = form.dateRange;
  if (!Array.isArray(dateRange)) {
    dateRange = [dateRange];
  }
  for (let i = 0; i < dateRange.length; i++) {
    const d = dateUtil.get(dateRange[i]);
    if (!form.withWeekend && [6, 0].includes(d.day())) {
      continue;
    }
    const body: any = {
      date: d.format(Const.FORMAT_YYYY_MM_DD),
      start: form.start,
      end: form.end,
      break: form.break,
      nightBreak: form.nightBreak,
      timeOff: form.timeOff,
      remotely: form.remotely,
      comment: form.comment,
      trafficList: [],
    };
    for (let j = 0; j < form.routeIds.length; j++) {
      const traffic = trafficList.value.find(
        (item) => item.routeId === form.routeIds[j],
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
