<template>
  <el-form
    ref="formRef"
    class="traffic-form"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item label="出発駅" prop="startStation">
      <el-input v-model="form.startStation" />
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in form.tractStation"
      :key="domain"
      :label="'経由駅' + (index + 1)"
      :prop="'tractStation.' + index"
    >
      <div class="d-flex w-100">
        <el-input v-model="form.tractStation![index]" />
        <el-button
          v-if="index === form.tractStation!.length - 1"
          class="ml-2"
          :icon="Plus"
          type="primary"
          plain
          @click="addTractStation"
        />
        <el-button
          v-if="index !== 0"
          class="ml-2"
          :icon="Delete"
          type="warning"
          plain
          @click="deleteTractStation"
        />
      </div>
    </el-form-item>
    <el-form-item label="到着駅" prop="endStation">
      <el-input v-model="form.endStation" />
    </el-form-item>
    <el-form-item label="往復実費" prop="roundTrip">
      <el-input-number v-model="form.roundTrip" :min="0" :controls="false" />
    </el-form-item>
    <el-form-item label="定期券" prop="monthTrainPass">
      <el-input-number
        v-model="form.monthTrainPass"
        :min="0"
        :controls="false"
      />
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
    <el-form-item v-if="submit && back">
      <el-button type="primary" @click="submit(formRef)"> 保存 </el-button>
      <el-button @click="back">一覧に戻る</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { TrafficAddUpdateForm } from '@/models';
import { FormRules } from 'element-plus';
import { PropType, ref } from 'vue';
import { Delete, Plus } from '@element-plus/icons-vue';
import { useVModel } from '@/hooks';

const props = defineProps({
  modelValue: {
    type: Object as PropType<TrafficAddUpdateForm>,
    required: true,
  },
  rules: {
    type: Object as PropType<FormRules<TrafficAddUpdateForm>>,
    required: true,
  },
  submit: {
    type: Function,
    required: false,
    default: undefined,
  },
  back: {
    type: Function,
    required: false,
    default: undefined,
  },
});

const emits = defineEmits(['update:modelValue']);
const formRef = ref();
const form = useVModel<TrafficAddUpdateForm>(props, 'modelValue', emits);

const addTractStation = () => {
  form.value.tractStation?.push('');
};

const deleteTractStation = (index: number) => {
  form.value.tractStation?.splice(index, 1);
};
</script>

<style scoped lang="scss">
.traffic-form {
  width: 500px;
  margin: 0 auto;
}
</style>
