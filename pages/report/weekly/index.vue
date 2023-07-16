<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report' }">提出</el-breadcrumb-item>
      <el-breadcrumb-item>週報一覧</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="mb-secounday">
        <template #header>
          <div class="card-header">
            <span>週報一覧</span>
          </div>
        </template>
        <div class="tool-bar">
          <el-date-picker v-model="year" type="year" placeholder="選択" format="YYYY年度" :clearable="false" />
          <div class="flex-grow-1"></div>
          <el-button type="danger" plain :icon="Delete" @click="clear">削除</el-button>
          <el-button type="warning" plain :icon="Edit">編集</el-button>
          <el-button type="primary" plain :icon="Plus" @click="$router.push('/report/weekly/add')">新規</el-button>
        </div>
        <WeeklySummaryTable :list="list" @check="check" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { ApprovalStatus } from '~/types/weekly.type';

  const { list, year, selectedRows, deleteWeekly, check } = useWeekly();

  const clear = async () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('削除したい週報を選択してください。', 'ご確認');
    } else if (selectedRows.value.some((item) => item.status !== ApprovalStatus.CREATED)) {
      ElMessageBox.alert('提出済または承認済の週報を削除できません。', 'ご確認');
    } else {
      try {
        await ElMessageBox.confirm(`選択された週報を削除しますか`, 'ご確認', {
          type: 'warning'
        });
        deleteWeekly();
        ElMessage({
          message: '削除しました。',
          type: 'success'
        });
      } catch (e: any) {}
    }
  };
</script>
