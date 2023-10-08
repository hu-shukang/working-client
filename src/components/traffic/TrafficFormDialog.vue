<template>
  <el-dialog
    v-model="dialogVisible"
    title="交通ルート登録"
    width="600px"
    :append-to-body="true"
  >
    <TrafficForm
      v-model="form"
      :rules="trafficFormRules"
      :submit="submit"
      :back="back"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import {
  TrafficAddUpdateForm,
  TrafficItemModel,
  trafficFormRules,
} from '@/models';
import { computed, reactive } from 'vue';
import TrafficForm from '@/components/traffic/TrafficForm.vue';
import { FormInstance } from 'element-plus';
import { useHttp } from '@/hooks';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:visible', 'submited']);
const { post } = useHttp();
const form = reactive<TrafficAddUpdateForm>({
  startStation: '',
  endStation: '',
  tractStation: [''],
});

const dialogVisible = computed({
  get: () => props.visible,
  set: (newValue) => emits('update:visible', newValue),
});

const submit = async (formRef: FormInstance) => {
  await formRef.validate(async (valid, _fields) => {
    console.log(_fields);
    if (!valid) {
      return;
    }
    const body = JSON.parse(JSON.stringify(form)) as TrafficAddUpdateForm;
    body.tractStation = body.tractStation?.filter((value) => value != '');
    const resp = await post<TrafficItemModel>('/traffic', body);
    dialogVisible.value = false;
    emits('submited', resp.data);
  });
};

const back = () => {
  dialogVisible.value = false;
};
</script>
