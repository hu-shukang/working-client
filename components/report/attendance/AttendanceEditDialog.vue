<template>
  <el-dialog v-model="dialogVisible" title="編集" :append-to-body="true" width="550px" center align-center>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="編集対象">
        <el-tag v-for="origin in origins" :key="origin.date">{{ toMMDD(origin.date) }}</el-tag>
      </el-form-item>
      <el-form-item label="勤務時間" prop="working">
        <el-time-picker
          v-model="form.working"
          is-range
          range-separator="〜"
          start-placeholder="出社時刻"
          end-placeholder="退社時刻"
          format="HH:mm"
        />
      </el-form-item>
      <el-form-item label="通常休憩時間(分)" prop="break">
        <el-input-number v-model="form.break" :min="0" class="input-width" :controls="false" />
      </el-form-item>
      <el-form-item label="深夜休憩時間(分)" prop="nightBreak">
        <el-input-number v-model="form.nightBreak" :min="0" class="input-width" :controls="false" />
      </el-form-item>
      <el-form-item label="休暇">
        <el-select v-model="form.timeOff" class="input-width" placeholder="休暇" :clearable="true">
          <el-option v-for="option in timeOffOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="在宅勤務">
        <el-switch v-model="form.remotely" />
      </el-form-item>
      <el-form-item label="交通費実費">
        <el-col :span="11">
          <el-select v-model="form.route" class="input-width" placeholder="交通費実費" clearable>
            <el-option
              v-for="item in trafficList"
              :key="item.id"
              :label="formatPrice(item.roundTrip, true)"
              :value="item.id"
            >
              <span class="float-left">{{ formatPrice(item.roundTrip, true) }}</span>
              <span class="float-right option-secounday">{{ formatStation(item) }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-button plain @click="addTraffic">交通ルート追加</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="備考">
        <el-input v-model="form.comment" :rows="3" class="input-width-2" type="textarea" placeholder="備考" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="submit(formRef)">編集</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { useReportStore } from '~/stores/report.store';
  import { AttendanceEditModel, AttendanceRowModel, initAttendanceEditModel } from '~/types/attendance.type';
  import { ConstUtil } from '~/utils/const.util';
  import { dateUtil } from '~/utils/date.util';

  const props = defineProps<{ visible: boolean; origins: AttendanceRowModel[] }>();
  const emit = defineEmits(['update:visible', 'output']);
  const router = useRouter();
  const reportStore = useReportStore();

  const trafficList = computed(() => reportStore.trafficList);
  const timeOffOptions = ConstUtil.TIME_OFF_OPTIONS;
  const dialogVisible = computed({
    get: () => props.visible,
    set: (newValue: boolean) => emit('update:visible', newValue)
  });

  const formatStation = stringUtil.formatStation;
  const formatPrice = stringUtil.formatPrice;

  const formRef = ref<FormInstance>();
  const form = reactive<AttendanceEditModel>(initAttendanceEditModel());

  const toMMDD = dateUtil.toMMDD;

  const validateWorking = (_rule: any, value: [string, string] | undefined, callback: any) => {
    if (value === undefined || dateUtil.isSameBefore(value[1], value[0])) {
      callback(new Error('勤務時間は正しく入力してください'));
    } else {
      callback();
    }
  };

  const validateBreak = (_rule: any, value: number, callback: any) => {
    if (form.working === undefined) {
      formRef.value!.validateField('validateWorking', () => null);
      return;
    }
    const start = dateUtil.toHHmm(form.working[0]);
    const end = dateUtil.toHHmm(form.working[1]);
    const daytimeActualWorking = dateUtil.calcDaytimeActualWorking({ start, end, break: value });
    if (daytimeActualWorking < 0) {
      callback(new Error('通常休憩時間は標準労働時間より少なくしてください'));
    } else {
      callback();
    }
  };

  const validateNightBreak = (_rule: any, value: number, callback: any) => {
    if (form.working === undefined) {
      formRef.value!.validateField('validateWorking', () => null);
      return;
    }
    const start = dateUtil.toHHmm(form.working[0]);
    const end = dateUtil.toHHmm(form.working[1]);
    const nightActualWorking = dateUtil.calcNightActualWorking({ start, end, nightBreak: value });
    if (nightActualWorking < 0) {
      callback(new Error('深夜休憩時間は深夜残業時間より少なくしてください'));
    } else {
      callback();
    }
  };

  const rules = reactive<FormRules<AttendanceEditModel>>({
    working: [{ validator: validateWorking, trigger: 'blur' }],
    break: [{ validator: validateBreak, trigger: 'blur' }],
    nightBreak: [{ validator: validateNightBreak, trigger: 'blur' }]
  });

  const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        emit('output', JSON.parse(JSON.stringify(form)));
        dialogVisible.value = false;
      } else {
        return false;
      }
    });
  };

  onMounted(() => {
    if (props.origins.length === 1) {
      const originData = props.origins[0];
      form.break = originData.break;
      form.comment = originData.comment;
      form.nightBreak = originData.nightBreak;
      form.timeOff = originData.timeOff;
      form.route = originData.route;
      form.working = [
        dateUtil.hhmmToDayjs(originData.start).toISOString(),
        dateUtil.hhmmToDayjs(originData.end).toISOString()
      ];
    }
  });
  const addTraffic = () => {
    router.push('/report/traffic');
  };
</script>

<style scoped lang="scss">
  .input-width {
    width: 150px !important;
  }
  .input-width-2 {
    width: 300px !important;
  }
  .el-tag {
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    width: 73px;
  }
</style>
