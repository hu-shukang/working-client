<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container class="main-container">
      <el-aside>
        <HomeMenu />
      </el-aside>
      <el-main>
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
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup></script>
