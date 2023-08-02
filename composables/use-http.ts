import { useIndexStore } from '~/stores/index.store';

type HttpConfig = {
  headers?: any | undefined;
  body?: any | undefined;
};

type Method = 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';

export function useHttp() {
  const indexStore = useIndexStore();
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const get = async <T>(url: string, config?: HttpConfig): Promise<T> => {
    return await request(url, 'GET', config);
  };

  const post = async <T>(url: string, config?: HttpConfig): Promise<T> => {
    return await request(url, 'POST', config);
  };

  const request = async <T>(url: string, method: Method, config?: HttpConfig): Promise<T> => {
    let headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    const idToken = indexStore.certification?.IdToken;
    if (idToken) {
      headers.idToken = idToken;
    }
    if (config?.headers) {
      headers = { ...headers, ...config.headers };
    }
    try {
      const resp = await fetch(`${apiBase}${url}`, {
        method: method,
        headers: headers,
        body: config?.body ? JSON.stringify(config.body) : undefined
      });
      const json = await resp.json();
      if (resp.ok) {
        return json as T;
      }
      throw new Error(json.message);
    } finally {
      console.log('finally');
    }
  };

  return { get, post };
}
