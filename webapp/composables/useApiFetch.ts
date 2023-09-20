import { RequestOptions } from 'types';

export function useApiFetch(path: string, options: RequestOptions) {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;
  const defaultHeaders = useRequestHeaders();
  const headers = { ...defaultHeaders, ...options.headers };

  return useFetch(path, {
    baseURL,
    credentials: 'include',
    headers,
    ...options
  });
}
