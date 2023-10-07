<template>
  <el-dialog
    v-model="dialogVisible"
    title="交通ルート登録"
    width="300px"
    :append-to-body="true"
  >
    <TrafficForm v-model="form" :rules="trafficFormRules" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="submit"> 登録 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { TrafficAddUpdateForm, trafficFormRules } from '@/models';
import { computed, reactive } from 'vue';
import TrafficForm from '@/components/traffic/TrafficForm.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:visible']);

const form = reactive<TrafficAddUpdateForm>({
  startStation: '',
  endStation: '',
  tractStation: [''],
});

const dialogVisible = computed({
  get: () => props.visible,
  set: (newValue) => emits('update:visible', newValue),
});

const submit = () => {
  console.log('submit');
  dialogVisible.value = false;
};
</script>
