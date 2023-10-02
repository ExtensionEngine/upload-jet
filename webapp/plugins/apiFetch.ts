import { FetchOption } from 'types/fetchOptions';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiFetch: function <T>(path: string, options: FetchOption = {}) {
        const config = useRuntimeConfig();
        const { apiBaseUrl: baseURL } = config.public;
        const defaultHeaders = useRequestHeaders();
        const { headers: overrideHeaders, method, ...rest } = options;
        const headers = { ...defaultHeaders, ...overrideHeaders };

        return $fetch<T>(path, {
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
