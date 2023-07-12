import { defineStore } from 'pinia';
import { TrafficRowModel, initTrafficRowModelList } from '~/types/traffic.type';
import { AttendanceRowModel, emptyAttendanceRowModel } from '~/types/attendance.type';

const initReportStore = () => {
  const { year, month } = dateUtil.current();
  return {
    year: year,
    month: month,
    attendance: {} as { [key: string]: AttendanceRowModel[] },
    trafficList: initTrafficRowModelList() as TrafficRowModel[]
  };
};

export const useReportStore = defineStore('attendance', {
  state: () => initReportStore(),
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
    },
    monthTrainPassTrafficList: (state) => {
      return state.trafficList.filter((item) => item.monthTrainPass);
    },
    getTrafficMap: (state) => {
      const result = new Map<string, TrafficRowModel>();
      state.trafficList.forEach((t) => result.set(t.id, t));
      return result;
    }
  },
  persist: true
});
