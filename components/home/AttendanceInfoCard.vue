<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤怠情報</span>
      </div>
    </template>
    <el-descriptions :column="2">
      <el-descriptions-item label="所属">東京技術部</el-descriptions-item>
      <el-descriptions-item label="氏名">胡 書康</el-descriptions-item>
      <el-descriptions-item label="基本出社時刻">09:00</el-descriptions-item>
      <el-descriptions-item label="基本退社時刻">18:00</el-descriptions-item>
      <el-descriptions-item label="基本休憩時間">1時間</el-descriptions-item>
      <el-descriptions-item label="所定労働時間">8時間</el-descriptions-item>
      <el-descriptions-item label="精算時間 (日)">15分</el-descriptions-item>
      <el-descriptions-item label="精算時間 (月)">15分</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
