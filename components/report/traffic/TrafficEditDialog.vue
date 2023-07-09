<template>
  <el-dialog v-model="dialogVisible" title="編集" :append-to-body="true" width="550px" center align-center>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="始発駅" prop="startStation" required>
        <el-col :span="11">
          <el-input v-model="form.startStation" :maxlength="20" class="input-width" placeholder="始発駅" />
        </el-col>
        <el-col v-if="!form.transitStation || form.transitStation.length < 5" :span="11">
          <el-button plain @click="addTransitStation">経由駅を追加</el-button>
        </el-col>
      </el-form-item>
      <div v-if="form.transitStation">
        <el-form-item v-for="(s, index) in form.transitStation" :key="s.key" :label="`経由駅${index + 1}`">
          <el-col :span="11">
            <el-input v-model="s.name" :maxlength="20" class="input-width" :placeholder="`経由駅${index + 1}`" />
          </el-col>
          <el-col :span="11">
            <el-button :icon="Delete" @click="deleteTransitStation(index)" />
          </el-col>
        </el-form-item>
      </div>
      <el-form-item label="到着駅" prop="endStation" required>
        <el-input v-model="form.endStation" :maxlength="20" class="input-width" placeholder="到着駅" />
      </el-form-item>
      <el-form-item label="往復実費" prop="roundTrip" required>
        <el-input-number v-model="form.roundTrip" :min="0" class="input-width" :controls="false" />
      </el-form-item>
      <el-form-item label="定期券(1ヶ月)" prop="monthTrainPass">
        <el-input-number v-model="form.monthTrainPass" :min="0" class="input-width" :controls="false" />
      </el-form-item>
      <el-form-item label="備考">
        <el-input
          v-model="form.comment"
          :rows="3"
          class="input-width-2"
          type="textarea"
          maxlength="100"
          show-word-limit
          placeholder="備考"
        />
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
  import { Delete } from '@element-plus/icons-vue';
  import { TrafficEditModel, TrafficRowModel, trafficRowModelToTrafficEditModel } from '~/types/traffic.type';

  const props = defineProps<{ visible: boolean; origin: TrafficRowModel }>();
  const emit = defineEmits(['update:visible', 'output']);

  const dialogVisible = computed({
    get: () => props.visible,
    set: (newValue: boolean) => emit('update:visible', newValue)
  });

  const formRef = ref<FormInstance>();
  const form = reactive<TrafficEditModel>(trafficRowModelToTrafficEditModel(props.origin));

  const validateRoundTrip = (_rule: any, value: number, callback: any) => {
    if (value <= 0) {
      callback(new Error('往復実費は必須です'));
    } else {
      callback();
    }
  };

  const validateMonthTrainPass = (_rule: any, value: number, callback: any) => {
    if (form.roundTrip && value <= form.roundTrip) {
      callback(new Error('定期券の金額は往復実費より以下なっています'));
    } else {
      callback();
    }
  };

  const rules = reactive<FormRules<TrafficEditModel>>({
    startStation: [{ required: true, message: '始発駅は必須です', trigger: 'blur' }],
    endStation: [{ required: true, message: '到着駅は必須です', trigger: 'blur' }],
    roundTrip: [
      { type: 'number', required: true, message: '往復実費は必須です', trigger: 'blur' },
      { validator: validateRoundTrip, trigger: 'blur' }
    ],
    monthTrainPass: [{ validator: validateMonthTrainPass, trigger: 'blur' }],
    comment: [{ min: 100, message: '駅名は最大100文字', trigger: 'blur' }]
  });

  const addTransitStation = () => {
    if (form.transitStation) {
      form.transitStation.push({
        key: form.transitStation[form.transitStation.length - 1].key + 1,
        name: ''
      });
    } else {
      form.transitStation = [
        {
          key: 0,
          name: ''
        }
      ];
    }
  };

  const deleteTransitStation = (index: number) => {
    if (!form.transitStation || form.transitStation.length === 0 || form.transitStation.length <= index) {
      return;
    }
    form.transitStation = form.transitStation.filter((_v, i) => i !== index);
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
