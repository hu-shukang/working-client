<template>
  <div>
    <table class="tbl stick">
      <thead>
        <tr>
          <th class="check" rowspan="2">
            <el-checkbox v-model="allCheck" :indeterminate="isIndeterminate" />
          </th>
          <th class="date" rowspan="2">日付</th>
          <th class="weekday" rowspan="2">曜日</th>
          <th colspan="2">時刻</th>
          <th class="break" rowspan="2">通常休憩<br />(単位: 分)</th>
          <th class="night-break" rowspan="2">深夜休憩<br />(単位: 分)</th>
          <th class="actual-working" rowspan="2">実働時間</th>
          <th class="settlement" rowspan="2">精算時間</th>
          <th class="night-overtime" rowspan="2">深夜残業</th>
          <th class="time-off" rowspan="2">休暇</th>
          <th class="remotely" rowspan="2">在宅</th>
          <th class="transportation-costs" rowspan="2">実費<br />通勤費</th>
          <th rowspan="2">備考<br />(遅刻・早退理由)</th>
        </tr>
        <tr>
          <th class="start">出社</th>
          <th class="end">退社</th>
        </tr>
      </thead>
    </table>
    <el-scrollbar class="scroll-bar" :always="true">
      <table class="tbl stick">
        <tbody>
          <AttendanceRow
            v-for="(row, index) in list"
            :key="row.date"
            :index="index"
            :row="row"
            :holidays="holidays"
            @check="check"
          />
        </tbody>
      </table>
    </el-scrollbar>
    <div class="mt-main">
      <div class="category-title">定期券(1ヶ月)費用申請</div>
      <div class="month-train-pass-select mt-secounday">
        <el-select v-model="monthTrainPass" placeholder="選択" clearable>
          <el-option v-for="item in trafficList" :key="item.id" :label="formatStation(item)" :value="item.id">
            <span class="float-left">{{ formatPrice(item.monthTrainPass!, true) }}</span>
            <span class="float-right option-secounday">{{ formatStation(item) }}</span>
          </el-option>
        </el-select>
        <div class="tip ml-secounday">※ 定期券(1ヶ月)費用を未入力の交通ルートは表示しません。</div>
      </div>
    </div>
    <div class="mt-main">
      <div class="category-title">集計</div>
      <el-descriptions class="attendance-descriptions mt-secounday" :column="6" border>
        <el-descriptions-item label="標準稼働">{{ totalWorkDay }}日</el-descriptions-item>
        <el-descriptions-item label="出勤日数">{{ actualWorkDay }}日</el-descriptions-item>
        <el-descriptions-item label="在宅日数" :span="4">{{ remotelyDay }}日</el-descriptions-item>
        <el-descriptions-item label="有休">2.0</el-descriptions-item>
        <el-descriptions-item label="半有休">2.0</el-descriptions-item>
        <el-descriptions-item label="振替休日">0.0</el-descriptions-item>
        <el-descriptions-item label="特別休暇">0.0</el-descriptions-item>
        <el-descriptions-item label="欠勤">0.0</el-descriptions-item>
        <el-descriptions-item label="休暇合計">0.0</el-descriptions-item>
        <el-descriptions-item label="休日出勤">0.0</el-descriptions-item>
        <el-descriptions-item label="振替出勤">0.0</el-descriptions-item>
        <el-descriptions-item label="遅刻">0.0</el-descriptions-item>
        <el-descriptions-item label="早退">0.0</el-descriptions-item>
        <el-descriptions-item label="その他" :span="2">0.0</el-descriptions-item>
        <el-descriptions-item label="経費" :span="4">
          <el-tag v-for="item of totalPrice.items" :key="item">{{ item }}</el-tag>
          <el-tag :key="totalPrice.total" type="success">{{ totalPrice.total }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ParsedContent } from '@nuxt/content/dist/runtime/types';
  import { useReportStore } from '~/stores/report.store';
  import { AttendanceRowModel } from '~/types/attendance.type';

  const props = defineProps<{ list: AttendanceRowModel[]; holidays: ParsedContent | null }>();
  const emit = defineEmits(['check']);

  const reportStore = useReportStore();
  const check = (index: number, value: boolean) => {
    emit('check', [index], value);
  };

  const isIndeterminate = computed(
    () => props.list.some((item) => item.checked) && props.list.some((item) => !item.checked)
  );

  const allCheck = computed({
    get: () => props.list.every((item) => item.checked),
    set: (value: boolean) => {
      emit('check', [...props.list.map((_, index) => index)], value);
    }
  });

  const monthTrainPass = ref<string>();
  const trafficList = computed(() => reportStore.monthTrainPassTrafficList);
  const totalWorkDay = computed(() => {
    let result = 0;
    for (const item of props.list) {
      const isWeekend = dateUtil.isWeekend(item.date);
      const yyyymmdd = dateUtil.toYYYYMMDD(item.date);
      const isHoliday = props.holidays ? props.holidays[yyyymmdd] !== undefined : false;
      if (!isWeekend && !isHoliday) {
        result += 1;
      }
    }
    return result;
  });
  const actualWorkDay = computed(() => {
    let result = 0;
    for (const item of props.list) {
      const m = dateUtil.calcActualWorking(item);
      if (m > 0) {
        result++;
      }
    }
    return result;
  });
  const remotelyDay = computed(() => props.list.filter((item) => item.remotely).length);
  const totalPrice = computed(() => {
    const trafficMap = reportStore.getTrafficMap;
    const items: string[] = [];
    let total = 0;
    let routePrice = 0;
    let remotelyPrice = 0;
    for (const item of props.list) {
      if (item.route) {
        const traffic = trafficMap.get(item.route);
        if (traffic) {
          routePrice += traffic.roundTrip;
        }
      }
      if (item.remotely) {
        remotelyPrice += ConstUtil.REMOTELT_ALLOWANCE;
      }
    }
    if (routePrice > 0) {
      items.push(`交通費実費: ${stringUtil.formatPrice(routePrice, true)}`);
      total += routePrice;
    }
    if (remotelyPrice > 0) {
      items.push(`在宅手当: ${stringUtil.formatPrice(remotelyPrice, true)}`);
      total += remotelyPrice;
    }
    if (monthTrainPass.value) {
      const monthTrainPassPrice = trafficMap.get(monthTrainPass.value)?.monthTrainPass ?? 0;
      if (monthTrainPassPrice > 0) {
        items.push(`定期券(1ヶ月): ${stringUtil.formatPrice(monthTrainPassPrice, true)}`);
        total += monthTrainPassPrice;
      }
    }
    return { items: items, total: `合計: ${stringUtil.formatPrice(total, true)}` };
  });

  const formatPrice = stringUtil.formatPrice;
  const formatStation = stringUtil.formatStationWithTransit;
</script>

<style scoped lang="scss">
  .scroll-bar {
    height: 400px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  .check,
  :deep(.check) {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
  }
  .date,
  :deep(.date) {
    width: 70px;
    max-width: 70px;
    min-width: 70px;
  }
  .weekday,
  :deep(.weekday) {
    width: 32px;
    max-width: 32px;
    min-width: 32px;
  }
  .start,
  :deep(.start) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .end,
  :deep(.end) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .break,
  :deep(.break) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .night-break,
  :deep(.night-break) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .actual-working,
  :deep(.actual-working) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .settlement,
  :deep(.settlement) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .night-overtime,
  :deep(.night-overtime) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .time-off,
  :deep(.time-off) {
    width: 64px;
    max-width: 64px;
    min-width: 64px;
  }
  .remotely,
  :deep(.remotely) {
    width: 50px;
    max-width: 50px;
    min-width: 50px;
  }
  .transportation-costs,
  :deep(.transportation-costs) {
    width: 70px;
    max-width: 70px;
    min-width: 70px;
  }
  .el-checkbox,
  :deep(.el-checkbox) {
    height: var(--table-row-default-height);
  }
  .month-train-pass-select {
    display: flex;
    align-items: center;
    .el-select {
      width: 300px;
    }
  }
</style>
