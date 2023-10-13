<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item>交通ルート</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>交通ルート</span>
        <el-button
          type="primary"
          :icon="Plus"
          @click="$router.push('/traffic/add')"
        >
          新規追加
        </el-button>
      </div>
    </template>
    <div v-loading="loading">
      <TrafficTable
        v-if="trafficList.length > 0"
        :traffic-list="trafficList"
        @edit="editHandler"
        @delete="deleteHandler"
      />
      <el-empty v-else :image-size="200" description="交通ルートは未登録です" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { onMounted } from 'vue';
import { TrafficItemModel } from '@/models';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { router } from '@/router';
import { useTrafficStore } from '@/stores/traffic.store';
import { storeToRefs } from 'pinia';
import TrafficTable from '@/components/traffic/TrafficTable.vue';

const trafficStore = useTrafficStore();
const { trafficList } = storeToRefs(trafficStore);
const { get, del, loading } = useHttp();

const request = async () => {
  const result = await get<TrafficItemModel[]>('/traffic', {
    withGlobalLoading: false,
  });
  trafficList.value = result.data;
};

const deleteHandler = async (index: number) => {
  try {
    await ElMessageBox.confirm(
      `[${index + 1}]番目の交通ルートを削除しますか？`,
      'ご確認',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    );
    await del(`/traffic/${trafficList.value[index].routeId}`, {
      withGlobalLoading: false,
    });
    trafficList.value.splice(index, 1);
    ElNotification({
      title: '成功',
      message: '削除しました。',
      type: 'success',
    });
  } catch (e: any) {
    console.log(e);
  }
};

const editHandler = (index: number) => {
  router.push(`/traffic/${trafficList.value[index].routeId}/edit`);
};

onMounted(async () => {
  await request();
});
</script>
