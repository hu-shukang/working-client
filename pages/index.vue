<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>ホーム画面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10" class="mb-secounday">
      <el-col :span="12">
        <NotifyCard />
      </el-col>
      <el-col :span="12">
        <AttendanceInfoCard />
      </el-col>
    </el-row>
    <div class="card-wrapper">
      <div class="card-chart"><RemotelyChartCard /></div>
      <div class="card-chart"><SelfRemotelyChartCard /></div>
      <div class="card-chart"><SelfOvertimeChartCard /></div>
      <div class="card-chart"><SelfPaidHolidayChartCard /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: [
      'auth'
      // Add in more middleware here
    ]
  });
</script>

<style scoped lang="scss">
  .card-wrapper {
    margin-left: -5px;
    margin-right: -5px;
    display: flex;
    flex-wrap: wrap;
    .card-chart {
      width: 25%;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      margin-bottom: var(--el-secounday-padding);
    }
    @media (max-width: 1400px) {
      .card-chart {
        width: 33.3%;
      }
    }
    @media (max-width: 800px) {
      .card-chart {
        width: 50%;
      }
    }
    @media (max-width: 600px) {
      .card-chart {
        width: 100%;
      }
    }
  }
</style>
