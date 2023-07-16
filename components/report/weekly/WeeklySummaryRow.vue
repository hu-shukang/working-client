<template>
  <tr>
    <td class="text-center check">
      <el-checkbox v-model="checked" />
    </td>
    <td class="text-center range">
      <div>
        <div class="start">{{ start }}</div>
        <div class="split">~</div>
        <div class="end">{{ end }}</div>
      </div>
    </td>
    <td class="text-center status">
      <el-tag v-if="row.status == ApprovalStatus.CREATED" type="info">{{ statusMap[row.status] }}</el-tag>
      <el-tag v-if="row.status == ApprovalStatus.SUBMISSION">{{ statusMap[row.status] }}</el-tag>
      <el-tag v-if="row.status == ApprovalStatus.APPROVAL" type="success">{{ statusMap[row.status] }}</el-tag>
    </td>
    <td class="text-center submit-date">{{ submitDate }}</td>
    <td class="text-center approval-employee">{{ row.approvalEmployee }}</td>
    <td class="text-center approval-date">{{ approvalDate }}</td>
    <td class="approval-comment">{{ row.approvalComment }}</td>
  </tr>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { WeeklySummaryRowModel, ApprovalStatus } from '~/types/weekly.type';

  const props = defineProps<{ index: number; row: WeeklySummaryRowModel }>();
  const emit = defineEmits(['check']);

  const checked = computed({
    get: () => props.row.checked,
    set: (value: boolean) => emit('check', props.index, value)
  });
  const start = computed(() => dateUtil.toMMDDWeekday(props.row.start));
  const end = computed(() => dateUtil.toMMDDWeekday(props.row.end));
  const statusMap = ConstUtil.APPROVAL_STATUS_MAP;
  const submitDate = computed(() => (props.row.submitDate ? dateUtil.toYYYYMMDDHHmm(props.row.submitDate) : ''));
  const approvalDate = computed(() => (props.row.approvalDate ? dateUtil.toYYYYMMDDHHmm(props.row.approvalDate) : ''));
</script>

<style scoped lang="scss">
  .range > div {
    display: flex;
    align-items: center;
    justify-content: center;
    .start,
    .end {
      width: 70px;
      text-align: center;
    }
    .split {
      width: 16px;
      text-align: center;
    }
  }
</style>
