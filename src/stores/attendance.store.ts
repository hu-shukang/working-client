import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', () => {
  const $reset = () => {};

  return { $reset };
});
