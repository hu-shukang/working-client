import { useGlobalStore } from '@/stores/global.store';
import axios from 'axios';
import { ref } from 'vue';

type HttpConfig = {
  withGlobalLoading?: boolean;
};

export function useHttp() {
  const globalStore = useGlobalStore();
  const loading = ref(false);

  const setLoading = (value: boolean, config?: HttpConfig) => {
    loading.value = value;
    if (config?.withGlobalLoading) {
      globalStore.loading = value;
    }
  };

  const get = async <T>(url: string, config?: HttpConfig) => {
    return await request<T>(url, 'GET', undefined, config);
  };

  const post = async <T>(url: string, body: any, config?: HttpConfig) => {
    return await request<T>(url, 'POST', body, config);
  };

  const put = async <T>(url: string, body: any, config?: HttpConfig) => {
    return await request<T>(url, 'PUT', body, config);
  };

  const del = async <T>(url: string, config?: HttpConfig) => {
    return await request<T>(url, 'DELETE', undefined, config);
  };

  const patch = async <T>(url: string, body: any, config?: HttpConfig) => {
    return await request<T>(url, 'PATCH', body, config);
  };

  const request = async <T>(
    url: string,
    method: string,
    body?: any,
    config?: HttpConfig,
  ) => {
    setLoading(true, config);
    let authorization = undefined;
    if (globalStore.accessToken) {
      authorization = 'Bearer ' + globalStore.accessToken;
    }
    try {
      return await axios.request<T>({
        url: `/api${url}`,
        data: body,
        method: method,
        headers: {
          Authorization: authorization,
        },
        timeout: 30000,
      });
    } finally {
      setLoading(false, config);
    }
  };

  return { loading, get, post, put, del, patch };
}
