<template>
  <div>
    <el-steps :active="1" align-center>
      <el-step title="Step 1" description="交通ルート" />
      <el-step title="Step 2" description="勤務表" />
      <el-step title="Step 3" description="その他" />
    </el-steps>
    <div>
      <slot />
    </div>
  </div>
</template>
