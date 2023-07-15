<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="collapse">
    <el-menu-item index="1" @click="$router.push('/')">
      <el-icon><HomeFilled /></el-icon>
      <template #title>ホーム</template>
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push('/report')">
      <el-icon><List /></el-icon>
      <template #title>提出物</template>
    </el-menu-item>
    <el-menu-item index="3" @click="$router.push('/management')">
      <el-icon><Management /></el-icon>
      <template #title>管理者</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
  const window = useWindow();
  const collapse = computed(() => window.width.value < ConstUtil.MENU_COLLAPSE_WIDTH);
</script>
