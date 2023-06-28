<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
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
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { AttendanceRowModel, emptyAttendanceRowModel } from '~/types/attendance.type';
  import { useAttendanceStore } from '~/stores/attendance.store';

  const attendanceStore = useAttendanceStore();
  const year = computed(() => attendanceStore.year);
  const month = computed(() => attendanceStore.month);
  const yearMonth = computed<Date>({
    get: () => new Date(attendanceStore.year, attendanceStore.month),
    set: (newDate: Date) => {
      attendanceStore.year = newDate.getFullYear();
      attendanceStore.month = newDate.getMonth();
    }
  });
  const list = ref<AttendanceRowModel[]>([]);

  const resetAttendanceList = (year: number, month: number) => {
    const dayCount = dateUtil.getDayCount(year, month);
    const result: AttendanceRowModel[] = [];
    for (let i = 1; i <= dayCount; i++) {
      const date = dateUtil.getIOSDateString(year, month, i);
      const attendanceRow = emptyAttendanceRowModel(date);
      result.push(attendanceRow);
    }
    list.value = result;
  };

  const { data: holidays } = await useAsyncData('holidays', () => queryContent(`/holidays/${year.value}`).findOne(), {
    watch: [year]
  });

  const add = () => {};

  const edit = () => {};

  const clear = async () => {
    const dates = list.value
      .filter((item) => item.checked)
      .map((item) => item.date)
      .map(dateUtil.toMMDD)
      .join(', ');
    if (dates === '') {
      ElMessageBox.alert('クリアしたい勤怠情報を選択してください。', 'ご確認');
    } else {
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

  onMounted(() => {
    resetAttendanceList(year.value, month.value);
  });

  watch([year, month], ([y, m]) => resetAttendanceList(y, m));
</script>

<style scoped lang="scss">
  .tool-bar {
    margin-bottom: var(--el-secounday-padding);
    display: flex;
  }
</style>
