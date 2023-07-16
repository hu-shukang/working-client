<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report' }">提出</el-breadcrumb-item>
      <el-breadcrumb-item>勤怠表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card class="mb-secounday">
        <template #header>
          <div class="card-header">
            <span>勤務表</span>
          </div>
        </template>
        <div class="tool-bar">
          <el-date-picker
            v-model="yearMonth"
            type="month"
            placeholder="Select"
            format="YYYY年MM月"
            :clearable="false"
          />
          <div class="flex-grow-1"></div>
          <el-button type="danger" plain :icon="Delete" @click="clear">クリア</el-button>
          <el-button type="warning" plain :icon="Edit" @click="edit">編集</el-button>
          <el-button type="primary" plain :icon="Plus" @click="add">新規</el-button>
        </div>
        <AttendanceTable :list="list" :holidays="holidays" @check="check" />

        <div class="mt-main text-center">
          <el-button size="large" @click="back">戻る</el-button>
          <el-button size="large" type="primary" @click="save">保存</el-button>
          <el-button size="large" type="success" @click="submit">提出</el-button>
        </div>
      </el-card>
    </div>

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
      @output="editAttendance"
    />
  </div>
</template>

<script setup lang="ts">
  import { Plus, Edit, Delete } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import { AttendanceAddModel } from '~/types/attendance.type';
  import { useReportStore } from '~/stores/report.store';

  const reportStore = useReportStore();
  const router = useRouter();
  const { list, selectedRows, fetch, addAttendance, editAttendance, clearAttendance, check } = useAttendance();
  const { year, month } = storeToRefs(reportStore);
  const addDialogVisiable = ref(false);
  const editDialogVisiable = ref(false);
  const yearMonth = computed<Date>({
    get: () => new Date(reportStore.year, reportStore.month),
    set: (newDate: Date) => {
      year.value = newDate.getFullYear();
      month.value = newDate.getMonth();
      fetch();
    }
  });

  const { data: holidays } = await useAsyncData('holidays', () => queryContent(`/holidays/${year.value}`).findOne(), {
    watch: [year]
  });

  const add = () => {
    addDialogVisiable.value = true;
  };

  const addOutput = (model: AttendanceAddModel) => {
    addAttendance(model, holidays.value);
  };

  const edit = () => {
    if (selectedRows.value.length === 0) {
      ElMessageBox.alert('編集したい勤怠情報を選択してください。', 'ご確認');
    } else {
      editDialogVisiable.value = true;
    }
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
        clearAttendance();
        ElMessage({
          message: 'クリアしました。',
          type: 'success'
        });
      } catch (e: any) {}
    }
  };

  const back = () => {
    ElMessageBox.confirm('保存せずに戻りますか？', 'ご確認', {
      confirmButtonText: 'OK',
      cancelButtonText: '続けて編集する',
      type: 'warning'
    })
      .then(() => {
        router.push('/report');
      })
      .catch(() => {});
  };

  const save = () => {
    ElMessageBox.confirm('保存しました', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
      showCancelButton: false
    }).then(() => {
      router.push('/report');
    });
  };

  const submit = () => {
    ElMessageBox.confirm('保存して提出画面に入りますか？', 'ご確認', {
      confirmButtonText: 'OK',
      cancelButtonText: '続けて編集する',
      type: 'info'
    })
      .then(() => {
        router.push('/report');
      })
      .catch(() => {});
  };
</script>
