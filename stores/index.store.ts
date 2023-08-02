import { defineStore } from 'pinia';
import { UserInfo } from '~/types/user.type';
import { AuthResult } from '~/types/certification.type';

type IndexStore = {
  certification?: AuthResult;
  user?: UserInfo;
};

const initIndexStore = (): IndexStore => {
  return {};
};

export const useIndexStore = defineStore('index', {
  state: () => initIndexStore()
});
