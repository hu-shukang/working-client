<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>ホーム画面</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row :gutter="20">
    <el-col :span="12">
      <NotifyCard />
    </el-col>
    <el-col :span="12">
      <AttendanceInfoCard />
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>
