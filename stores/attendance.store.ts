import { defineStore } from 'pinia';
import { TrafficRowModel } from '~/types/traffic.type';
import { AttendanceRowModel, emptyAttendanceRowModel } from '~/types/attendance.type';

const initAttendanceStore = () => {
  const { year, month } = dateUtil.current();
  return {
    year: year,
    month: month,
    attendance: {} as { [key: string]: AttendanceRowModel[] },
    trafficList: [] as TrafficRowModel[]
  };
};

export const useAttendanceStore = defineStore('attendance', {
  state: () => initAttendanceStore(),
  getters: {
    getAttendanceList: (state) => {
      let result = state.attendance[`${state.year}${state.month}`] as AttendanceRowModel[];
      if (result) {
        return result;
      }
      const dayCount = dateUtil.getDayCount(state.year, state.month);
      result = [];
      for (let i = 1; i <= dayCount; i++) {
        const date = dateUtil.getIOSDateString(state.year, state.month, i);
        const attendanceRow = emptyAttendanceRowModel(date);
        result.push(attendanceRow);
      }
      return result;
    }
  },
  persist: true
});
