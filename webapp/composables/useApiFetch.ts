export function useApiFetch() {
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.apiBaseUrl;
  const defaultHeaders = useRequestHeaders();

  async function apiFetch(
    path: string,
    method = 'GET',
    credentials: RequestCredentials = 'include',
    headers = defaultHeaders
  ) {
    const requestOptions = {
      method,
      credentials,
      headers
    };
    const response = await fetch(`${API_BASE_URL}/${path}`, requestOptions);
    return response;
  }
  return { API_BASE_URL, apiFetch };
}
