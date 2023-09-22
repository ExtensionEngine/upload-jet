import { UseFetchOptions } from 'nuxt/app';
import { UserData } from 'types';

export function useApiFetch<T extends UserData>(
  path: string,
  options: UseFetchOptions<UserData>
) {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;
  const defaultHeaders = useRequestHeaders();
  const { headers: overrideHeaders, ...rest } = options;
  const headers = { ...defaultHeaders, ...overrideHeaders };

  return useFetch<UserData>(path, {
    baseURL,
    credentials: 'include',
    headers,
    ...rest
  });
}
