<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item>提出</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button plain @click="$router.push('/report/traffic')">通勤経路</el-button>
      <el-button plain @click="$router.push('/report/attendance')">勤怠表</el-button>
    </div>
  </div>
</template>
