<template>
  <el-dialog v-model="dialogVisible" title="新規作成" :append-to-body="true" width="550px" center align-center>
    <el-alert
      title="※ 既に作成されたレコードに対して再度作成する場合は上書きになります。"
      type="warning"
      class="mb-2"
      :closable="false"
    />
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="単一・範囲">
        <el-radio-group v-model="form.isSingleDate">
          <el-radio :label="true">単一の日で作成する</el-radio>
          <el-radio :label="false">範囲の日で作成する</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.isSingleDate" label="日付" prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="選択" :disabled-date="disabledDate" />
      </el-form-item>
      <el-form-item v-if="!form.isSingleDate" label="日付範囲" prop="range">
        <div style="width: 300px">
          <el-date-picker
            v-model="form.range"
            type="daterange"
            range-separator="〜"
            start-placeholder="開始日"
            end-placeholder="終了日"
            :disabled-date="disabledDate"
          />
        </div>
      </el-form-item>
      <el-form-item v-if="!form.isSingleDate" label="週末祝日除外">
        <el-switch v-model="form.expectWeekendHoliday" />
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
      <el-form-item label="備考">
        <el-input v-model="form.comment" :rows="3" class="input-width-2" type="textarea" placeholder="備考" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="submit(formRef)">作成</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { AttendanceAddModel, initAttendanceAddModel } from '~/types/attendance.type';
  import { ConstUtil } from '~/utils/const.util';

  const props = defineProps<{ visible: boolean; year: number; month: number }>();
  const emit = defineEmits(['update:visible', 'output']);

  const timeOffOptions = ConstUtil.TIME_OFF_OPTIONS;
  const dialogVisible = computed({
    get: () => props.visible,
    set: (newValue: boolean) => emit('update:visible', newValue)
  });

  const formRef = ref<FormInstance>();
  const form = reactive<AttendanceAddModel>(initAttendanceAddModel());

  const validateDate = (_rule: any, value: string | undefined, callback: any) => {
    if (form.isSingleDate && stringUtil.isBlank(value)) {
      callback(new Error('日付を入力してください'));
    } else {
      callback();
    }
  };

  const validateRange = (_rule: any, value: [string, string] | undefined, callback: any) => {
    if (!form.isSingleDate && stringUtil.isNull(value)) {
      callback(new Error('日付範囲を入力してください'));
    } else {
      callback();
    }
  };

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

  const rules = reactive<FormRules<AttendanceAddModel>>({
    date: [{ validator: validateDate, trigger: 'blur' }],
    range: [{ validator: validateRange, trigger: 'blur' }],
    working: [{ validator: validateWorking, trigger: 'blur' }],
    break: [{ validator: validateBreak, trigger: 'blur' }],
    nightBreak: [{ validator: validateNightBreak, trigger: 'blur' }]
  });

  const disabledDate = (time: Date) => {
    return !dateUtil.inMonth(props.year, props.month, time);
  };

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
</script>

<style scoped lang="scss">
  .input-width {
    width: 150px !important;
  }
  .input-width-2 {
    width: 300px !important;
  }
</style>
