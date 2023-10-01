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
    <el-form
      v-loading="loading"
      class="traffic-add-form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="出発駅" prop="startStation">
        <el-input v-model="form.startStation" class="w-250px" />
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in form.tractStation"
        :key="domain"
        :label="'経由駅' + (index + 1)"
        :prop="'tractStation.' + index"
      >
        <div class="d-flex w-100">
          <el-input v-model="form.tractStation![index]" class="w-250px" />
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
        <el-input v-model="form.endStation" class="w-250px" />
      </el-form-item>
      <el-form-item label="往復実費" prop="roundTrip">
        <el-input-number
          v-model="form.roundTrip"
          :min="0"
          class="w-150px"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="定期券" prop="monthTrainPass">
        <el-input-number
          v-model="form.monthTrainPass"
          :min="0"
          class="w-150px"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="備考">
        <el-input
          v-model="form.comment"
          class="w-250px"
          type="textarea"
          :rows="3"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"> 編集 </el-button>
        <el-button @click="back">一覧に戻る</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { TrafficAddUpdateForm, TrafficItemModel } from '@/models';
import { TRIGGERS } from '@/utils';
import { Delete, Plus } from '@element-plus/icons-vue';
import { ElNotification, FormRules } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { put, get, loading } = useHttp();
let tmpModel: TrafficItemModel | undefined = undefined;
const form = reactive<TrafficAddUpdateForm>({
  startStation: '',
  endStation: '',
  tractStation: [''],
});

const rules: FormRules<TrafficAddUpdateForm> = {
  startStation: [
    { required: true, message: '出発駅は必須です', trigger: TRIGGERS.SUBMIT },
    { max: 20, message: '20文字以下', trigger: TRIGGERS.SUBMIT },
  ],
  endStation: [
    { required: true, message: '到着駅は必須です', trigger: TRIGGERS.SUBMIT },
    { max: 20, message: '20文字以下', trigger: TRIGGERS.SUBMIT },
  ],
  roundTrip: [
    {
      type: 'integer',
      message: '往復実費は数値です',
      trigger: TRIGGERS.SUBMIT,
    },
    { min: 0, message: '往復実費は0以上です', trigger: TRIGGERS.SUBMIT },
  ],
  monthTrainPass: [
    { type: 'integer', message: '定期券は数値です', trigger: TRIGGERS.SUBMIT },
    { min: 0, message: '定期券は0以上です', trigger: TRIGGERS.SUBMIT },
  ],
  comment: [{ max: 100, message: '100文字以下です', trigger: TRIGGERS.SUBMIT }],
};

const addTractStation = () => {
  form.tractStation?.push('');
};

const deleteTractStation = (index: number) => {
  form.tractStation?.splice(index, 1);
};

const back = () => {
  router.push('/traffic');
};

const submit = async () => {
  const body = JSON.parse(JSON.stringify(form)) as TrafficAddUpdateForm;
  body.tractStation = body.tractStation?.filter((value) => value != '');
  await put(`/traffic/${tmpModel!.routeId}`, body);
  ElNotification({
    title: '成功',
    message: '更新しました。',
    type: 'success',
  });
  back();
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

<style scoped lang="scss">
.w-250px {
  width: 250px;
}
.w-150px {
  width: 150px;
}
.traffic-add-form {
  width: 500px;
  margin: 0 auto;
}
</style>
