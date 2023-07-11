<template>
  <el-card class="box-card">
    <LineChart class="chat" v-bind="lineChartProps" />
    <ChartCardFooter comment="2023-07-23集計" />
  </el-card>
</template>

<script setup lang="ts">
  import { ChartData } from 'chart.js';
  import { LineChart, useLineChart } from 'vue-chart-3';

  const data = ref([3.5, 20.5, 17, 28, 5]);
  const chartData = computed<ChartData<'line', number[], unknown>>(() => ({
    labels: ['2023-03', '2023-04', '2023-05', '2023-06', '2023-07'],
    datasets: [
      {
        data: data.value,
        backgroundColor: '#b88230',
        borderColor: '#eebe77'
      }
    ]
  }));
  const options = computed(() => ({
    scales: {
      y: {
        min: 0,
        ticks: {
          callback: stringUtil.formatHour
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '月ごと残業時間(自身)'
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `残業時間: ${value}時間`;
          }
        }
      }
    }
  }));
  const { lineChartProps } = useLineChart({
    chartData,
    options
  });
</script>

<style scoped lang="scss">
  .chat {
    height: 260px;
  }
</style>
