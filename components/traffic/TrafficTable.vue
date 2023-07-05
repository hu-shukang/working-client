<template>
  <div>
    <table class="tbl stick">
      <thead>
        <tr>
          <th class="check" rowspan="2">
            <el-checkbox v-model="allCheck" :indeterminate="isIndeterminate" />
          </th>
          <th class="index" rowspan="2">No.</th>
          <th class="route" rowspan="2">通勤経路</th>
          <th class="round-trip">往復実費</th>
          <th class="month-train-pass">定期(1ヶ月)</th>
          <th class="comment">コメント</th>
        </tr>
      </thead>
    </table>
    <el-empty
      v-if="modelValue.length === 0"
      :image-size="200"
      description="頻繁に使用する交通ルートを追加してください"
    />
    <el-scrollbar v-else class="scroll-bar" :always="true">
      <table class="tbl stick">
        <tbody>
          <TrafficRow v-for="(row, index) in modelValue" :key="row.id" :index="index" :row="row" @check="check" />
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { TrafficRowModel } from '~/types/traffic.type';

  const props = defineProps<{ modelValue: TrafficRowModel[] }>();
  const emit = defineEmits(['update:modelValue']);

  const check = (index: number, value: boolean) => {
    const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as TrafficRowModel[];
    newModelValue[index].checked = value;
    emit('update:modelValue', newModelValue);
  };

  const isIndeterminate = computed(
    () => props.modelValue.some((item) => item.checked) && props.modelValue.some((item) => !item.checked)
  );

  const allCheck = computed({
    get: () => props.modelValue.length > 0 && props.modelValue.every((item) => item.checked),
    set: (value: boolean) => {
      const newModelValue = JSON.parse(JSON.stringify(props.modelValue)) as TrafficRowModel[];
      for (let i = 0; i < newModelValue.length; i++) {
        newModelValue[i].checked = value;
      }
      emit('update:modelValue', newModelValue);
    }
  });
</script>

<style scoped lang="scss">
  .scroll-bar {
    height: calc(
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
  .index,
  :deep(.index) {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
  }

  .route,
  :deep(.route) {
    width: 300px;
    max-width: 300px;
    min-width: 300px;
  }
  .round-trip,
  :deep(.round-trip) {
    width: 150px;
    max-width: 150px;
    min-width: 150px;
  }
  .month-train-pass,
  :deep(.month-train-pass) {
    width: 150px;
    max-width: 150px;
    min-width: 150px;
  }
  .el-checkbox,
  :deep(.el-checkbox) {
    height: var(--table-row-default-height);
  }
</style>
