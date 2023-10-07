<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/traffic' }">
      交通ルート
    </el-breadcrumb-item>
    <el-breadcrumb-item>編集</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>交通ルートを編集</span>
      </div>
    </template>
    <TrafficForm
      v-model="form"
      v-loading="loading"
      :rules="trafficFormRules"
      :submit="submit"
      :back="back"
    />
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import {
  TrafficAddUpdateForm,
  TrafficItemModel,
  trafficFormRules,
} from '@/models';
import { ElNotification, FormInstance } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TrafficForm from '@/components/traffic/TrafficForm.vue';

const route = useRoute();
const router = useRouter();
const { put, get, loading } = useHttp();
let tmpModel: TrafficItemModel | undefined = undefined;
const form = reactive<TrafficAddUpdateForm>({
  startStation: '',
  endStation: '',
  tractStation: [''],
});

const back = () => {
  router.push('/traffic');
};

const submit = async (formRef: FormInstance) => {
  await formRef.validate(async (valid, _fields) => {
    if (!valid) {
      return;
    }
    const body = JSON.parse(JSON.stringify(form)) as TrafficAddUpdateForm;
    body.tractStation = body.tractStation?.filter((value) => value != '');
    await put(`/traffic/${tmpModel!.routeId}`, body);
    ElNotification({
      title: '成功',
      message: '更新しました。',
      type: 'success',
    });
    back();
  });
};

const loadTraffic = async (routeId: string) => {
  const result = await get<TrafficItemModel[]>(`/traffic?routeId=${routeId}`, {
    withGlobalLoading: false,
  });
  if (result.data.length !== 1) {
    ElNotification({
      title: 'エラー',
      message: '該当ルートは存在しません。',
      type: 'error',
    });
    back();
  }
  tmpModel = result.data[0];
  form.startStation = tmpModel.startStation;
  form.endStation = tmpModel.endStation;
  form.tractStation = tmpModel.tractStation ?? [''];
  form.roundTrip = tmpModel.roundTrip;
  form.monthTrainPass = tmpModel.monthTrainPass;
  form.comment = tmpModel.comment;
};

onMounted(async () => {
  const routeId = route.params.routeId as string;
  await loadTraffic(routeId);
});
</script>
