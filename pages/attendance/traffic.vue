<template>
  <div>
    <div class="tool-bar">
      <div>通勤経路</div>
      <div class="flex-grow-1"></div>
      <el-button type="danger" plain :icon="Delete" @click="remove">削除</el-button>
      <el-button type="warning" plain :icon="Edit" @click="edit">編集</el-button>
      <el-button type="primary" plain :icon="Plus" @click="add">新規</el-button>
    </div>
    <TrafficTable v-model="list" />

    <TrafficAddDialog v-if="addDialogVisiable" v-model:visible="addDialogVisiable" @output="addOutput" />
    <TrafficEditDialog
      v-if="editDialogVisiable"
      v-model:visible="editDialogVisiable"
      :origin="editTarget!"
      @output="editOutput"
    />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import {
    TrafficRowModel,
    TrafficAddModel,
    trafficAddModelToTrafficRowModel,
    TrafficEditModel
  } from '~/types/traffic.type';
  import { useAttendanceStore } from '~/stores/attendance.store';

  const attendanceStore = useAttendanceStore();
  const addDialogVisiable = ref(false);
  const editDialogVisiable = ref(false);
  const selectedRows = computed(() => list.value.filter((item) => item.checked));
  const editTarget = ref<TrafficRowModel>();

  const list = computed({
    get: () => attendanceStore.trafficList,
    set: (value: TrafficRowModel[]) => {
      attendanceStore.trafficList = value;
    }
  });

  const remove = async () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('削除したい通勤経路を選択してください。', 'ご確認');
    } else {
      const targets = selectedRows.value.map((item) => `No.${item.index}`).join(', ');
      try {
        await ElMessageBox.confirm(`[${targets}]の通勤経路をクリアしますか`, 'ご確認', {
          type: 'warning'
        });
        let newList = JSON.parse(JSON.stringify(list.value)) as TrafficRowModel[];
        newList = newList.filter((item) => !item.checked);
        newList.forEach((item, index) => {
          item.index = index;
        });
        list.value = newList;
        ElMessage({
          message: '削除しました。',
          type: 'success'
        });
      } catch (e: any) {}
    }
  };

  const edit = () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('編集したい通勤経路を選択してください。', 'ご確認');
    } else if (selectedRows.value.length > 1) {
      ElMessageBox.alert('1回は1行しか編集できません。', 'ご確認');
    } else {
      editTarget.value = selectedRows.value[0];
      editDialogVisiable.value = true;
    }
  };

  const editOutput = (model: TrafficEditModel) => {
    const index = list.value.findIndex((item) => item.id === model.id);
    if (index < 0 || index >= list.value.length) {
      ElMessageBox.alert('編集したい通勤経路が存在しません。', 'ご確認');
      return;
    }
    const newModel = trafficAddModelToTrafficRowModel(index, model);
    newModel.checked = true;
    list.value[index] = newModel;
  };

  const add = () => {
    addDialogVisiable.value = true;
  };

  const addOutput = (model: TrafficAddModel) => {
    const index = list.value.length;
    const v = trafficAddModelToTrafficRowModel(index, model);
    list.value.push(v);
  };
</script>

<style scoped lang="scss">
  .tool-bar {
    height: 32px;
    margin-bottom: var(--el-secounday-padding);
    display: flex;
    align-items: center;
  }
</style>
