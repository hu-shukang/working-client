<template>
  <el-menu default-active="1" class="el-menu-vertical-demo">
    <el-menu-item index="1" @click="$router.push('/')">
      <el-icon><HomeFilled /></el-icon>
      <span>ホーム</span>
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push('/attendance')">
      <el-icon><HomeFilled /></el-icon>
      <span>勤務表</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts"></script>
