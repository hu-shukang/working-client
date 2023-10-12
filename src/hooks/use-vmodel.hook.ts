import { StringKey, isObject } from '@/utils';
import { computed } from 'vue';

const cacheMap = new WeakMap<any, any>();

export function useVModel<P extends object, K extends StringKey<P>>(
  props: P,
  propName: K,
  emits: any,
) {
  const getProxy = (prop: object) => {
    return new Proxy<typeof prop>(prop, {
      get: (target, key) => {
        return Reflect.get(target, key);
      },
      set: (target, key, value) => {
        const newValue = {
          ...target,
          [key]: value,
        };
        emits(`update:${propName}`, newValue);
        return true;
      },
    });
  };

  return computed<P[K]>({
    get: () => {
      const prop = props[propName];
      if (isObject(prop)) {
        if (cacheMap.has(prop)) {
          return cacheMap.get(prop);
        }
        const proxy = getProxy(prop);
        cacheMap.set(props[propName], proxy);
        return proxy;
      } else {
        return prop;
      }
    },
    set: (newValue) => {
      emits(`update:${propName}`, newValue);
    },
  });
}
