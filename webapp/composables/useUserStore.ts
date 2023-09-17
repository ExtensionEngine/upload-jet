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

  const headers = useRequestHeaders();

  async function getUser() {
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

  const isLoggedIn = computed(() => {
    return user.value?.id;
  });

  async function logIn() {
    const userData = await getUser();
    user.value = userData?.value;
  }

  async function deleteCookie() {
    await useFetch('http://localhost:3000/identity/logout', {
      method: 'GET',
      credentials: 'include',
      headers
    });
  }

  async function logOut() {
    user.value = null;
    await deleteCookie();
  }

  return { user, isLoggedIn, getUser, logOut, logIn };
}
