import { FetchOption } from 'types/fetchOptions';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiFetch: (path: string, options: FetchOption = {}): Promise<any> => {
        const config = useRuntimeConfig();
        const { apiBaseUrl: baseURL } = config.public;
        const defaultHeaders = useRequestHeaders();
        const { headers: overrideHeaders, method, ...rest } = options;
        const headers = { ...defaultHeaders, ...overrideHeaders };

        return $fetch(path, {
          baseURL,
          credentials: 'include',
          headers,
          method,
          ...rest
        });
      }
    }
  };
});
