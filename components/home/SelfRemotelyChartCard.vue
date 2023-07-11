<template>
  <el-card class="box-card">
    <BarChart class="chat" v-bind="barChartProps" />
    <ChartCardFooter comment="2023-07-23集計" />
  </el-card>
</template>

<script setup lang="ts">
  import { ChartData } from 'chart.js';
  import { BarChart, useBarChart } from 'vue-chart-3';

  const data = ref([0.6, 0.5, 0.98, 1, 0.79]);
  const chartData = computed<ChartData<'bar', number[], unknown>>(() => ({
    labels: ['2023-03', '2023-04', '2023-05', '2023-06', '2023-07'],
    datasets: [
      {
        data: data.value,
        backgroundColor: data.value.map(chartUtil.getBarColorGreen),
        borderColor: data.value.map(chartUtil.getBarColorGreen)
      }
    ]
  }));
  const options = computed(() => ({
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2,
          callback: stringUtil.formatPercent
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '月ごと在宅率(自身)'
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return '在宅率: ' + stringUtil.formatPercent(value);
          }
        }
      }
    }
  }));
  const { barChartProps } = useBarChart({
    chartData,
    options
  });
</script>

<style scoped lang="scss">
  .chat {
    height: 260px;
  }
</style>
