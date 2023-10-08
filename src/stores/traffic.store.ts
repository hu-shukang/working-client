import { TrafficItemModel } from '@/models';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTrafficStore = defineStore('traffic', () => {
  const trafficList = ref<TrafficItemModel[]>([]);
  const $reset = () => {};

  const trafficListOnlyRoundTrip = computed(() =>
    trafficList.value.filter((item) => item.roundTrip),
  );

  return { $reset, trafficList, trafficListOnlyRoundTrip };
});
