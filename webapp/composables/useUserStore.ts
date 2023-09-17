type UserData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  githubId: number;
  email: string;
  avatarUrl: string;
  role: string;
};

export default function useUserStore() {
  const user: Ref<UserData | null> = useState('user', () => null);

  async function fetchUser() {
    const headers = useRequestHeaders();
    const { data } = await useFetch<UserData>(
      'http://localhost:3000/identity/me',
      {
        method: 'GET',
        credentials: 'include',
        headers
      }
    );
    return data;
  }

  async function setUser() {
    const userData = await fetchUser();
    user.value = userData?.value;
  }

  const isLoggedIn = computed(() => {
    return !!user.value?.id;
  });

  async function deleteCookie() {
    const headers = useRequestHeaders();

    const response = await fetch('http://localhost:3000/identity/signout', {
      method: 'GET',
      credentials: 'include',
      headers
    });
    return response.ok;
  }

  async function signOut() {
    user.value = null;
    const success = await deleteCookie();
    if (success) return navigateTo('/');
  }

  return { user, isLoggedIn, fetchUser, signOut, deleteCookie, setUser };
}
