<template>
  <div>
    <table class="tbl stick">
      <thead>
        <tr>
          <th class="check" rowspan="2">
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
    <el-empty
      v-if="modelValue.length === 0"
      :image-size="150"
      description="頻繁に使用する交通ルートを追加してください"
    />
    <el-scrollbar v-else class="scroll-bar" :always="true">
      <table class="tbl stick">
        <tbody>
          <WeeklySummaryRow
            v-for="(row, index) in modelValue"
            :key="row.start"
            :index="index"
            :row="row"
            @check="check"
          />
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { WeeklySummaryRowModel } from '~/types/weekly.type';

  const props = defineProps<{ modelValue: WeeklySummaryRowModel[] }>();
  const emit = defineEmits(['update:modelValue']);

  const check = (index: number, value: boolean) => {
    const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as WeeklySummaryRowModel[];
    newModelValue[index].checked = value;
    emit('update:modelValue', newModelValue);
  };

  const isIndeterminate = computed(
    () => props.modelValue.some((item) => item.checked) && props.modelValue.some((item) => !item.checked)
  );

  const allCheck = computed({
    get: () => props.modelValue.length > 0 && props.modelValue.every((item) => item.checked),
    set: (value: boolean) => {
      const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as WeeklySummaryRowModel[];
      for (let i = 0; i < newModelValue.length; i++) {
        newModelValue[i].checked = value;
      }
      emit('update:modelValue', newModelValue);
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
