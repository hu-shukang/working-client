<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item>提出</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="mb-secounday">
        <template #header>
          <div class="card-header">
            <span>月例提出物</span>
          </div>
        </template>
        <div>
          <el-button plain @click="$router.push('/report/traffic')">通勤経路</el-button>
          <el-button plain @click="$router.push('/report/attendance')">勤怠表</el-button>
          <el-button plain>提出</el-button>
        </div>
      </el-card>
      <el-card class="mb-secounday">
        <template #header>
          <div class="card-header">
            <span>社員情報変更</span>
          </div>
        </template>
        <div>
          <el-button plain>氏名・住所・連絡先</el-button>
          <el-button plain>口座</el-button>
          <el-button plain>扶養家族</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
