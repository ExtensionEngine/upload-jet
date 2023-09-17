type UserData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  githubId: number;
  email: string;
  avatarUrl: string;
  role: string;
};

const API_BASE_URL = 'http://localhost:3000';

async function fetchUser() {
  const headers = useRequestHeaders();
  const { data } = await useFetch<UserData>(`${API_BASE_URL}/identity/me`, {
    method: 'GET',
    credentials: 'include',
    headers
  });
  return data;
}

async function deleteCookie() {
  const headers = useRequestHeaders();

  const { status } = await useFetch(`${API_BASE_URL}/identity/signout`, {
    method: 'GET',
    credentials: 'include',
    headers
  });
  return status;
}

export default { fetchUser, deleteCookie };
