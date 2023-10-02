import { FetchOption } from 'types/fetchOptions';

export function useApiFetch<T>(path: string, options: FetchOption = {}) {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;
  const defaultHeaders = useRequestHeaders();
  const { headers: overrideHeaders, method, ...rest } = options;
  const headers = { ...defaultHeaders, ...overrideHeaders };

  return useFetch<T, any, any, any>(path, {
    baseURL,
    credentials: 'include',
    headers,
    method,
    ...rest
  });
}
