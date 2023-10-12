export const isObject = (value: any): value is object => {
  return typeof value === 'object';
};

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isBoolean = (value: any): value is boolean => {
  return typeof value === 'boolean';
};

export const isArray = <T>(value: any): value is T[] => {
  return Array.isArray(value);
};

export type StringKey<T> = Extract<keyof T, string>;
