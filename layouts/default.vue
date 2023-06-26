<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container class="main-container">
      <el-aside>
        <HomeMenu />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
