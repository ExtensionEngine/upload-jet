import { UserData } from 'types';

const API_BASE_URL = 'http://localhost:3000';

export async function fetchUser() {
  const headers = useRequestHeaders();
  const { data } = await useFetch<UserData>(`${API_BASE_URL}/identity/me`, {
    method: 'GET',
    credentials: 'include',
    headers
  });
  return data;
}

export async function deleteCookie() {
  const headers = useRequestHeaders();
  const { status } = await useFetch(`${API_BASE_URL}/identity/signout`, {
    method: 'GET',
    credentials: 'include',
    headers
  });
  return status;
}