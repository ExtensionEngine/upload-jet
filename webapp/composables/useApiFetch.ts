type FetchOption = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, string>;
};

export function useApiFetch<T>(path: string, options: FetchOption) {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;
  const defaultHeaders = useRequestHeaders();
  const { headers: overrideHeaders, method, ...rest } = options;
  const headers = { ...defaultHeaders, ...overrideHeaders };

  return useFetch<T>(path, {
    baseURL,
    credentials: 'include',
    headers,
    ...rest
  });
}
