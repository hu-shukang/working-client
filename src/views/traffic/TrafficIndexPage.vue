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
      <el-table v-if="list.length !== 0" :data="list" border>
        <el-table-column type="index" width="40" align="center" />
        <el-table-column prop="startStation" label="出発駅" width="180" />
        <el-table-column prop="tractStation" label="経由駅">
          <template #default="scope">
            {{ scope.row.tractStation.join(', ') }}
          </template>
        </el-table-column>
        <el-table-column prop="endStation" label="到着駅" width="180" />
        <el-table-column prop="roundTrip" label="往復実費(円)" width="110" />
        <el-table-column prop="monthTrainPass" label="定期券(円)" width="110" />
        <el-table-column prop="comment" label="備考" />
        <el-table-column label="操作" width="100" align="center">
          <template #default="scope">
            <el-button
              link
              type="warning"
              size="small"
              @click="editHandler(scope.$index)"
            >
              編集
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="deleteHandler(scope.$index)"
            >
              削除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else :image-size="200" description="交通ルートは未登録です" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { onMounted, ref } from 'vue';
import { TrafficItemModel } from '@/models';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { router } from '@/router';

const { get, del, loading } = useHttp();
const list = ref<TrafficItemModel[]>([]);

const request = async () => {
  const result = await get<TrafficItemModel[]>('/traffic', {
    withGlobalLoading: false,
  });
  list.value = result.data;
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
    await del(`/traffic/${list.value[index].routeId}`, {
      withGlobalLoading: false,
    });
    list.value.splice(index, 1);
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
  router.push(`/traffic/${list.value[index].routeId}/edit`);
};

onMounted(async () => {
  await request();
});
</script>
