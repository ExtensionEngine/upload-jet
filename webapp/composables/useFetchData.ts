import { AsyncData } from 'nuxt/app';

export default function useFetchData(
  route: string,
  options?: any
): AsyncData<any, any> {
  const headers = useRequestHeaders();
  const { apiUrl } = useRuntimeConfig().public;

  const defaultOptions = {
    headers,
    credentials: 'include'
  };

  const url = new URL(route, apiUrl);

  return useFetch(url.href, {
    ...defaultOptions,
    ...options
  });
}
