import { TokenRefreshError } from '~/types/error.type';
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
  const commonHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  };
  const get = async <T>(url: string, config?: HttpConfig): Promise<T> => {
    return await request(url, 'GET', config);
  };

  const post = async <T>(url: string, config?: HttpConfig): Promise<T> => {
    return await request(url, 'POST', config);
  };

  const refreshTokens = async () => {
    const idToken = indexStore.certification?.idToken as string;
    const refreshToken = indexStore.certification?.refreshToken as string;
    try {
      const resp = await fetch(`${apiBase}/token/refresh`, {
        method: 'POST',
        headers: {
          ...commonHeaders,
          Authorization: idToken
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });
      const json = await resp.json();
      indexStore.certification = json;
    } catch (e: any) {
      throw new TokenRefreshError();
    } finally {
      console.log('finally');
    }
  };

  const request = async <T>(url: string, method: Method, config?: HttpConfig): Promise<T> => {
    let idToken = indexStore.certification?.idToken;
    const expiryDate = indexStore.certification?.expiryDate;
    if (expiryDate && expiryDate <= dateUtil.unix()) {
      await refreshTokens();
      idToken = indexStore.certification?.idToken;
    }
    let headers = { ...commonHeaders };
    if (idToken) {
      headers.Authorization = idToken;
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
      indexStore.stopLoading();
    }
  };

  return { get, post };
}
