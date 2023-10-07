<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/traffic' }">
      交通ルート
    </el-breadcrumb-item>
    <el-breadcrumb-item>新規追加</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>交通ルートを新規追加</span>
      </div>
    </template>
    <TrafficForm
      v-model="form"
      :rules="trafficFormRules"
      :submit="submit"
      :back="back"
    />
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { TrafficAddUpdateForm, trafficFormRules } from '@/models';
import TrafficForm from '@/components/traffic/TrafficForm.vue';
import { ElMessageBox } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { post } = useHttp();
const form = reactive<TrafficAddUpdateForm>({
  startStation: '',
  endStation: '',
  tractStation: [''],
});

const resetForm = () => {
  form.startStation = '';
  form.endStation = '';
  form.tractStation = [''];
  form.roundTrip = undefined;
  form.monthTrainPass = undefined;
  form.comment = '';
};

const back = () => {
  router.push('/traffic');
};

const submit = async () => {
  const body = JSON.parse(JSON.stringify(form)) as TrafficAddUpdateForm;
  body.tractStation = body.tractStation?.filter((value) => value != '');
  await post('/traffic', body);
  ElMessageBox.confirm(
    'ルートの登録は成功しました。続けて登録しますか？',
    '成功',
    {
      confirmButtonText: '続けて登録',
      cancelButtonText: '一覧に戻る',
      type: 'success',
    },
  )
    .then(() => {
      resetForm();
    })
    .catch(() => {
      back();
    });
};
</script>
