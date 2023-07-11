<template>
  <el-card class="box-card">
    <DoughnutChart class="chat" v-bind="doughnutChartProps" />
    <ChartCardFooter comment="2023-07-23集計" />
  </el-card>
</template>

<script setup lang="ts">
  import { ChartData } from 'chart.js';
  import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';

  const data = ref([6, 1, 2, 1, 2]);
  const chartData = computed<ChartData<'doughnut', number[], unknown>>(() => ({
    labels: ['残りの有給', '3月', '4月', '6月', '7月'],
    datasets: [
      {
        data: data.value
      }
    ]
  }));
  const options = computed(() => ({
    plugins: {
      title: {
        display: true,
        text: '今年の有給消化状況(自身)'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            if (context.dataIndex === 0) {
              return `残りの有給日数: ${value}日`;
            }
            return `消化した有給日数: ${value}日`;
          }
        }
      }
    }
  }));
  const { doughnutChartProps } = useDoughnutChart({
    chartData,
    options
  });
</script>

<style scoped lang="scss">
  .chat {
    height: 260px;
  }
</style>
