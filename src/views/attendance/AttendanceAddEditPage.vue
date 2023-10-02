<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表【{{ date }}】</span>
        <div>
          <el-button type="danger" :icon="Delete"> クリア </el-button>
          <el-button type="primary" :icon="Plus"> 書き込み </el-button>
        </div>
      </div>
    </template>
    <div>
      <el-table
        v-if="attendanceList.length !== 0"
        :data="attendanceList"
        border
      >
        <el-table-column type="selection" width="44" align="center" />
        <el-table-column
          prop="dateInfo.value"
          label="日付"
          width="74"
          align="center"
        />
        <el-table-column label="曜日" width="60" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.dateInfo.isSaturday" type="warning">
              {{ scope.row.dateInfo.weekday }}
            </el-tag>
            <el-tag v-else-if="scope.row.dateInfo.isSunday" type="danger">
              {{ scope.row.dateInfo.weekday }}
            </el-tag>
            <el-tag v-else>{{ scope.row.dateInfo.weekday }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="start" label="出勤時刻" width="84" />
        <el-table-column prop="end" label="退勤時刻" width="84" />
        <el-table-column prop="break" label="通常休憩" width="84" />
        <el-table-column prop="nightBreak" label="深夜休憩" width="84" />
        <el-table-column prop="timeOff" label="休暇" width="60" />
        <el-table-column prop="remotely" label="在宅" width="60" />
        <el-table-column prop="roundTrip" width="90">
          <template #header>
            <div class="custom-table-header">
              <span>交通費</span>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="交通費の金額にフォーカスすれば、詳細をご確認できます。"
                placement="top"
              >
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="備考" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { AttendanceItem, DateInfo } from '@/models';
import { dateUtil } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { QuestionFilled, Plus, Delete } from '@element-plus/icons-vue';

const route = useRoute();
const date = route.params.date as string;
const attendanceList = ref<AttendanceItem[]>([]);

const getAttendanceList = (dateInfoList: DateInfo[]): AttendanceItem[] => {
  return dateInfoList.map((item) => ({
    dateInfo: item,
    start: '',
    end: '',
  }));
};

onMounted(() => {
  // const mode = route.meta.mode as string;
  const dateInfoList = dateUtil.getDateInfoList(date);
  attendanceList.value = getAttendanceList(dateInfoList);
});
</script>

<style scoped lang="scss"></style>
