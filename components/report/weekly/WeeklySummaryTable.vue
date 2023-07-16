<template>
  <div>
    <table class="tbl stick">
      <thead>
        <tr>
          <th class="check">
            <el-checkbox v-model="allCheck" :indeterminate="isIndeterminate" />
          </th>
          <th class="range">期間</th>
          <th class="status">ステータス</th>
          <th class="submit-date">提出日時</th>
          <th class="approval-employee">承認者</th>
          <th class="approval-date">承認日時</th>
          <th class="approval-comment">承認者コメント</th>
        </tr>
      </thead>
    </table>
    <el-empty v-if="list.length === 0" :image-size="150" description="頻繁に使用する交通ルートを追加してください" />
    <el-scrollbar v-else class="scroll-bar" :always="true">
      <table class="tbl stick">
        <tbody>
          <WeeklySummaryRow v-for="(row, index) in list" :key="row.id" :index="index" :row="row" @check="check" />
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { WeeklySummaryRowModel } from '~/types/weekly.type';

  const props = defineProps<{ list: WeeklySummaryRowModel[] }>();
  const emit = defineEmits(['check']);

  const check = (index: number, value: boolean) => {
    emit('check', [index], value);
  };

  const isIndeterminate = computed(
    () => props.list.some((item) => item.checked) && props.list.some((item) => !item.checked)
  );

  const allCheck = computed({
    get: () => props.list.length > 0 && props.list.every((item) => item.checked),
    set: (value: boolean) => {
      const indexList = props.list.map((_, index) => index);
      emit('check', indexList, value);
    }
  });
</script>

<style scoped lang="scss">
  .scroll-bar {
    max-height: calc(
      100vh - var(--el-header-height) - var(--el-footer-height) - var(--el-main-padding) - var(--el-main-padding) - 34px -
        42px - 64px
    );
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  .check,
  :deep(.check) {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
  }
  .range,
  :deep(.range) {
    width: 180px;
    min-width: 180px;
    max-width: 180px;
  }

  .status,
  :deep(.status) {
    width: 80px;
    max-width: 80px;
    min-width: 80px;
  }
  .submit-date,
  :deep(.submit-date) {
    width: 150px;
    max-width: 150px;
    min-width: 150px;
  }
  .approval-date,
  :deep(.approval-date) {
    width: 150px;
    max-width: 150px;
    min-width: 150px;
  }
  .approval-employee,
  :deep(.approval-employee) {
    width: 100px;
    max-width: 100px;
    min-width: 100px;
  }
  .el-checkbox,
  :deep(.el-checkbox) {
    height: var(--table-row-default-height);
  }
</style>
