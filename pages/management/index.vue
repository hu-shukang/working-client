<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item>管理者</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="mb-secounday">
        <template #header>
          <div class="card-header">
            <span>管理</span>
          </div>
        </template>
        <div>
          <el-button plain @click="$router.push('/management/department')">部門管理</el-button>
          <el-button plain @click="$router.push('/management/employee')">社員管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
