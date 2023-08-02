import { defineStore } from 'pinia';
import { AuthResult } from '~/types/certification.type';

type IndexStore = {
  certification?: AuthResult;
};

const initIndexStore = (): IndexStore => {
  return {};
};

export const useIndexStore = defineStore('index', {
  state: () => initIndexStore()
});
