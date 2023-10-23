import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAttendanceStore = defineStore('attendance', () => {
  const holiday = ref<{ [key: string]: Record<string, string> }>({});
  const $reset = () => {};

  return { $reset, holiday };
});
