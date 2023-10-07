import { TrafficItemModel } from '@/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTrafficStore = defineStore('traffic', () => {
  const trafficList = ref<TrafficItemModel[]>([]);
  const $reset = () => {};

  return { $reset, trafficList };
});
