<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report' }">提出</el-breadcrumb-item>
      <el-breadcrumb-item>勤怠表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tool-bar">
      <el-date-picker v-model="yearMonth" type="month" placeholder="Select" format="YYYY年MM月" :clearable="false" />
      <div class="flex-grow-1"></div>
      <el-button type="danger" plain :icon="Delete" @click="clear">クリア</el-button>
      <el-button type="warning" plain :icon="Edit" @click="edit">編集</el-button>
      <el-button type="primary" plain :icon="Plus" @click="add">新規</el-button>
    </div>
    <AttendanceTable v-model="list" :holidays="holidays" />

    <AttendanceAddDialog
      v-if="addDialogVisiable"
      v-model:visible="addDialogVisiable"
      :year="year"
      :month="month"
      @output="addOutput"
    />

    <AttendanceEditDialog
      v-if="editDialogVisiable"
      v-model:visible="editDialogVisiable"
      :origins="selectedRows"
      @output="editOutput"
    />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import {
    AttendanceAddModel,
    AttendanceRowModel,
    emptyAttendanceRowModel,
    toAttendanceRowModel,
    AttendanceEditModel
  } from '~/types/attendance.type';
  import { useAttendanceStore } from '~/stores/attendance.store';

  const attendanceStore = useAttendanceStore();
  const { year, month } = storeToRefs(attendanceStore);
  const addDialogVisiable = ref(false);
  const editDialogVisiable = ref(false);
  const yearMonth = computed<Date>({
    get: () => new Date(attendanceStore.year, attendanceStore.month),
    set: (newDate: Date) => {
      year.value = newDate.getFullYear();
      month.value = newDate.getMonth();
    }
  });

  const list = computed({
    get: () => attendanceStore.getAttendanceList,
    set: (value: AttendanceRowModel[]) => {
      attendanceStore.attendance[`${year.value}${month.value}`] = value;
    }
  });
  const selectedRows = computed(() => list.value.filter((item) => item.checked));

  const { data: holidays } = await useAsyncData('holidays', () => queryContent(`/holidays/${year.value}`).findOne(), {
    watch: [year]
  });

  const add = () => {
    addDialogVisiable.value = true;
  };

  const addOutput = (model: AttendanceAddModel) => {
    if (model.isSingleDate) {
      for (let i = 0; i < list.value.length; i++) {
        const row = list.value[i];
        if (dateUtil.isSame(row.date, model.date, 'date')) {
          list.value[i] = toAttendanceRowModel(model, row.date, list.value[i].checked);
          break;
        }
      }
    } else {
      for (let i = 0; i < list.value.length; i++) {
        const row = list.value[i];
        if (dateUtil.inRange(model.range!, row.date)) {
          if (
            model.expectWeekendHoliday &&
            (dateUtil.isWeekend(row.date) || (holidays.value && holidays.value[dateUtil.toYYYYMMDD(row.date)]))
          ) {
            continue;
          }
          list.value[i] = toAttendanceRowModel(model, row.date, list.value[i].checked);
        }
      }
    }
  };

  const edit = () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('編集したい勤怠情報を選択してください。', 'ご確認');
    } else {
      editDialogVisiable.value = true;
    }
  };

  const editOutput = (model: AttendanceEditModel) => {
    const newList = JSON.parse(JSON.stringify(list.value)) as AttendanceRowModel[];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].checked) {
        newList[i] = toAttendanceRowModel(model, newList[i].date, newList[i].checked);
      }
    }
    list.value = newList;
  };

  const clear = async () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('クリアしたい勤怠情報を選択してください。', 'ご確認');
    } else {
      const dates = selectedRows.value
        .map((item) => item.date)
        .map(dateUtil.toMMDD)
        .join(', ');
      try {
        await ElMessageBox.confirm(`[${dates}]の勤怠情報をクリアしますか`, 'ご確認', {
          type: 'warning'
        });
        const newList = JSON.parse(JSON.stringify(list.value)) as AttendanceRowModel[];
        for (let i = 0; i < newList.length; i++) {
          if (newList[i].checked) {
            newList[i] = emptyAttendanceRowModel(newList[i].date);
          }
        }
        list.value = newList;
        ElMessage({
          message: 'クリアしました。',
          type: 'success'
        });
      } catch (e: any) {}
    }
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
