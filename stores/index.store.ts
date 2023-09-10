import { defineStore } from 'pinia';
import { EmployeeInfo, Tokens } from '~/types/user.type';

type IndexStore = {
  certification?: Tokens;
  employeeInfo?: EmployeeInfo;
};

const initIndexStore = (): IndexStore => {
  return {};
};

export const useIndexStore = defineStore('index', {
  state: () => initIndexStore()
});
