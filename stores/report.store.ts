import { defineStore } from 'pinia';
import { TrafficRowModel, initTrafficRowModelList } from '~/types/traffic.type';

const initReportStore = () => {
  const { year, month } = dateUtil.current();
  return {
    year: year,
    month: month,
    trafficList: initTrafficRowModelList() as TrafficRowModel[]
  };
};

export const useReportStore = defineStore('attendance', {
  state: () => initReportStore(),
  getters: {
    monthTrainPassTrafficList: (state) => {
      return state.trafficList.filter((item) => item.monthTrainPass);
    },
    getTrafficMap: (state) => {
      const result = new Map<string, TrafficRowModel>();
      state.trafficList.forEach((t) => result.set(t.id, t));
      return result;
    }
  }
});
