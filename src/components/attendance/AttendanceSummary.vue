<template>
  <div class="title">月次合計</div>
  <div class="container">
    <div class="item">実働時間(月次合計)</div>
    <div class="item">
      {{ dateUtil.formatMinutes(data.totalActualWorkingTime) }}
    </div>
    <div class="item">精算時間(月次合計)</div>
    <div class="item">
      {{ dateUtil.formatMinutes(data.totalCalculateWorkingTime) }}
    </div>
    <div class="item">深夜残業時間(月次合計)</div>
    <div class="item">
      {{ dateUtil.formatMinutes(data.totalNightOvertime) }}
    </div>
    <div class="item">在宅日数</div>
    <div class="item">{{ data.remotelyCount + '日' }}</div>
    <div class="item">在宅補助</div>
    <div class="item">
      {{
        `${data.remotelyCount}日 × ¥400/日 = ` +
        stringUtil.formatMoney(data.remotelyCount * 400)
      }}
    </div>
    <div class="item">日常交通実費(月次合計)</div>
    <div class="item">{{ stringUtil.formatMoney(data.totalRoundTrip) }}</div>
  </div>
</template>

<script setup lang="ts">
import { AttendanceSummaryModel } from '@/models';
import { dateUtil, stringUtil } from '@/utils';
import { PropType } from 'vue';

defineProps({
  data: {
    type: Object as PropType<AttendanceSummaryModel>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.title {
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
  margin-left: 10px;
}
.container {
  --header-color: rgb(144, 147, 153);
  display: grid;
  grid-template-columns: 200px 1fr 200px 1fr 200px 1fr;
  font-size: 14px;
  color: var(--header-color);
  .item {
    border: 1px solid var(--el-border-color-extra-light);
    padding: 15px 10px;
    &:nth-child(2n + 1) {
      background-color: var(--el-fill-color-extra-light);
      font-weight: bold;
    }
  }
}
</style>
