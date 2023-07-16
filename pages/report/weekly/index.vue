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
            <el-date-picker v-model="year" type="year" placeholder="選択" format="YYYY年度" :clearable="false" />
          </div>
        </template>
        <WeeklySummaryTable v-model="list" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { WeeklySummaryRowModel, initWeeklySummary, weeklySummaryToRowModel } from '~/types/weekly.type';
  import { useReportStore } from '~/stores/report.store';

  const reportStore = useReportStore();
  const list = ref<WeeklySummaryRowModel[]>([]);
  const year = computed({
    get: () => {
      const date = new Date();
      date.setFullYear(reportStore.year);
      return date;
    },
    set: (value) => (reportStore.year = value.getFullYear())
  });

  onMounted(() => {
    list.value = initWeeklySummary().map(weeklySummaryToRowModel);
  });
</script>
