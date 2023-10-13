<template>
  <el-table :data="trafficList" border>
    <el-table-column type="index" width="40" align="center" />
    <el-table-column prop="startStation" label="出発駅" width="180" />
    <el-table-column prop="tractStation" label="経由駅">
      <template #default="scope">
        {{ scope.row.tractStation.join(', ') }}
      </template>
    </el-table-column>
    <el-table-column prop="endStation" label="到着駅" width="180" />
    <el-table-column label="往復実費" width="110">
      <template #default="scope">
        {{ stringUtil.formatMoney(scope.row.roundTrip) }}
      </template>
    </el-table-column>
    <el-table-column v-if="withMonthTrainPass" label="定期券" width="110">
      <template #default="scope">
        {{ stringUtil.formatMoney(scope.row.monthTrainPass) }}
      </template>
    </el-table-column>
    <el-table-column prop="comment" label="備考" />
    <el-table-column v-if="withControl" label="操作" width="100" align="center">
      <template #default="scope">
        <el-button
          link
          type="warning"
          size="small"
          @click="editHandler(scope.$index)"
        >
          編集
        </el-button>
        <el-button
          link
          type="danger"
          size="small"
          @click="deleteHandler(scope.$index)"
        >
          削除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { TrafficItemModel } from '@/models';
import { stringUtil } from '@/utils';
import { PropType } from 'vue';

defineProps({
  trafficList: {
    type: Array as PropType<TrafficItemModel[]>,
    required: true,
  },
  withMonthTrainPass: {
    type: Boolean,
    required: false,
    default: true,
  },
  withControl: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emits = defineEmits(['edit', 'delete']);

const editHandler = (index: number) => {
  emits('edit', index);
};

const deleteHandler = (index: number) => {
  emits('delete', index);
};
</script>
