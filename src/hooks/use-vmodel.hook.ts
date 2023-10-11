import { computed } from 'vue';

const cacheMap = new WeakMap();

export function useVModel<T extends object>(
  props: any,
  propName: string,
  emits: any,
) {
  return computed({
    get: () => {
      if (cacheMap.has(props[propName])) {
        return cacheMap.get(props[propName]);
      }

      const proxy = new Proxy<T>(props[propName], {
        get: (target, key) => {
          return Reflect.get(target, key);
        },
        set: (target, key, value) => {
          const newValue = {
            ...target,
            [key]: value,
          };
          emits('update:' + propName, newValue);
          return true;
        },
      });
      cacheMap.set(props[propName], proxy);
      return proxy;
    },
    set: (newValue) => {
      emits(`update:${propName}`, newValue);
    },
  });
}
