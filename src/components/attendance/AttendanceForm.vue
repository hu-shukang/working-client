<template>
  <el-form class="attendance-write-form" :model="form" label-width="100px">
    <el-form-item label="日付選択方式" prop="type">
      <el-radio-group :model-value="type" @change="typeHandler">
        <el-radio label="date">単一</el-radio>
        <el-radio label="dates">複数</el-radio>
        <el-radio label="daterange">範囲</el-radio>
      </el-radio-group>
      <ul class="comment">
        <li>単一：シングルの日付を選択できます。</li>
        <li>複数：複数の日付を一括で選択できます。</li>
        <li>範囲：開始日と終了日を指定して範囲で選択できます。</li>
      </ul>
    </el-form-item>
    <el-form-item label="日付" prop="range">
      <el-date-picker
        v-model="form.dateRange"
        :type="type"
        :placeholder="placeholder[type]"
        :default-value="defaultDate"
        :disabled-date="disabledDate"
        start-placeholder="開始日"
        end-placeholder="終了日"
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
    <el-form-item label="深夜休憩" prop="nightBreak">
      <el-input
        v-model.number="form.nightBreak"
        class="min-length"
        placeholder="深夜休憩"
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
  <TrafficFormDialog
    v-model:visible="trafficFormDialogVisible"
    @submited="trafficFormSubmitHandler"
  />
</template>

<script setup lang="ts">
import { AttendanceItemFormModel, TrafficItemModel } from '@/models';
import { Const, dateUtil } from '@/utils';
import { PropType, computed, ref } from 'vue';
import { Check, Close, Plus } from '@element-plus/icons-vue';
import TrafficFormDialog from '@/components/traffic/TrafficFormDialog.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<AttendanceItemFormModel>,
    required: true,
  },
  trafficList: {
    type: Array as PropType<TrafficItemModel[]>,
    required: true,
  },
  yyyymm: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['update:modelValue', 'addTraffic', 'save', 'back']);

const form = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue),
});

const trafficFormDialogVisible = ref(false);
const defaultDate = computed(() => dateUtil.get(`${props.yyyymm}-01`).toDate());
const type = ref('date');
const placeholder: { [key: string]: string } = {
  date: '単一の日付を選択',
  dates: '複数の日付を選択',
  daterange: '範囲を選択',
};

const disabledDate = (value: Date): boolean => {
  return props.yyyymm != dateUtil.get(value).format(Const.FORMAT_YYYY_MM);
};

const typeHandler = (value: string) => {
  form.value.dateRange = [];
  type.value = value;
};

const trafficListOnlyRoundTrip = computed(() =>
  props.trafficList.filter((item) => item.roundTrip),
);

const routeChangeHandler = (ids: string[]) => {
  const comment = props.trafficList
    .filter((item) => ids.includes(item.routeId))
    .map((item) => item.comment)
    .filter((item) => item != undefined)
    .join(',');
  form.value.comment = comment;
};

const trafficFormSubmitHandler = (traffic: TrafficItemModel) => {
  emits('addTraffic', traffic);
};

const save = () => {
  emits('save');
};

const back = () => {
  emits('back');
};
</script>

<style scoped lang="scss">
.attendance-write-form {
  width: 650px;
  margin: 0px auto;
}
</style>
