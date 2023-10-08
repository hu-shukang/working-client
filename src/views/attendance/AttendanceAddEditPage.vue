<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/attendance' }">
      勤務表
    </el-breadcrumb-item>
    <el-breadcrumb-item>勤務表作成</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表【{{ date }}】</span>
        <div>
          <el-button type="danger" :icon="Delete"> クリア </el-button>
          <el-button
            type="primary"
            :icon="Plus"
            @click="$router.push(`${$route.path}/item`)"
          >
            書き込み
          </el-button>
        </div>
      </div>
    </template>
    <div v-loading="loading">
      <el-table
        v-if="attendanceList.length !== 0"
        :data="attendanceList"
        border
      >
        <el-table-column type="selection" width="44" align="center" />
        <el-table-column
          prop="date.value"
          label="日付"
          width="74"
          align="center"
        />
        <el-table-column label="曜日" width="60" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.date.isSaturday" type="warning">
              {{ scope.row.date.weekday }}
            </el-tag>
            <el-tag v-else-if="scope.row.date.isSunday" type="danger">
              {{ scope.row.date.weekday }}
            </el-tag>
            <el-tag v-else>{{ scope.row.date.weekday }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="start"
          label="出勤時刻"
          width="84"
          align="center"
        />
        <el-table-column
          prop="end"
          label="退勤時刻"
          width="84"
          align="center"
        />
        <el-table-column
          prop="break"
          label="通常休憩"
          width="84"
          align="center"
        >
          <template #default="scope">
            <span v-if="scope.row.break">{{ scope.row.break + '(分)' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nightBreak"
          label="深夜休憩"
          width="84"
          align="center"
        >
          <template #default="scope">
            <span v-if="scope.row.nightBreak">
              {{ scope.row.nightBreak + '(分)' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="timeOff"
          label="休暇"
          width="60"
          align="center"
        />
        <el-table-column label="在宅" width="60" align="center">
          <template #default="scope">
            <el-icon v-if="scope.row.remotely"><Select /></el-icon>
          </template>
        </el-table-column>
        <el-table-column width="90">
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
          <template #default="scope">
            <span v-if="scope.row.trafficList.length > 0">
              {{
                scope.row.trafficList
                  .map((item: any) => item.roundTrip)
                  .reduce((x: number, y: number) => x + y, 0)
              }}(円)
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="備考" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { AttendanceRespItem, AttendanceViewItem, DateInfo } from '@/models';
import { dateUtil } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { QuestionFilled, Plus, Delete, Select } from '@element-plus/icons-vue';
import { useHttp } from '@/hooks';

const route = useRoute();
const date = route.params.date as string;
const attendanceList = ref<AttendanceViewItem[]>([]);
const { get, loading } = useHttp();

const initAttendanceItem = (dateInfo: DateInfo) => {
  return { date: dateInfo, start: '', end: '', trafficList: [] };
};

const getAttendanceList = (
  items: AttendanceRespItem[],
): AttendanceViewItem[] => {
  const dateInfoList = dateUtil.getDateInfoList(date);
  const result: AttendanceViewItem[] = [];
  let idx = 0;
  for (const dateInfo of dateInfoList) {
    if (idx === items.length || dateInfo.yyyyMMDD !== items[idx].date) {
      result.push(initAttendanceItem(dateInfo));
    } else {
      result.push({
        ...items[idx++],
        date: dateInfo,
      });
    }
  }
  return result;
};

onMounted(async () => {
  // const mode = route.meta.mode as string;
  const resp = await get<AttendanceRespItem[]>(`/attendance/${date}`, {
    withGlobalLoading: false,
  });
  attendanceList.value = getAttendanceList(resp.data);
});
</script>

<style scoped lang="scss"></style>
