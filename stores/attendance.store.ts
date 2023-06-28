import { defineStore } from 'pinia';

const initAttendanceStore = () => {
  const { year, month } = dateUtil.current();
  return {
    year: year,
    month: month
  };
};

export const useAttendanceStore = defineStore('attendance', {
  state: () => initAttendanceStore()
});
