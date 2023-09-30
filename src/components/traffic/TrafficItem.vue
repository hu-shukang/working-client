<template>
  <div class="traffic-item">
    <section class="routes">
      <div class="start">{{ item.startStation }}</div>
      <!-- <div v-for="s of item.tractStation" :key="s">{{ s }}</div> -->
      <div class="arrow" />
      <div class="end">{{ item.endStation }}</div>
    </section>
    <section class="round-trip">
      <div class="title">往復料金</div>
      <div>{{ item.roundTrip }}</div>
    </section>
    <section class="month-train-pass">
      <div class="title">定期券(1ヶ月)</div>
      <div>{{ item.monthTrainPass }}</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TrafficItemModel } from '@/models';

defineProps({
  item: { type: Object as PropType<TrafficItemModel>, required: true },
});
</script>

<style scoped lang="scss">
.routes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  .start,
  .end {
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
