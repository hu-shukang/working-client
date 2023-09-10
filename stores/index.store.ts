import { defineStore } from 'pinia';
import { EmployeeInfo, Tokens } from '~/types/user.type';

type IndexStore = {
  certification?: Tokens;
  employeeInfo?: EmployeeInfo;
  loading: boolean;
};

const initIndexStore = (): IndexStore => {
  return {
    loading: false
  };
};

export const useIndexStore = defineStore('index', {
  state: () => initIndexStore(),
  actions: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    }
  }
});
