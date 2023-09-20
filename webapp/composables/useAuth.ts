import { UserData } from 'types';

export default async function useAuth() {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;

  const user: Ref<UserData | null> = useState('user', () => null);

  async function setUser() {
    const { data } = await useApiFetch('identity/me', { method: 'GET' });
    user.value = data.value as UserData;
  }

  await setUser();

  const isLoggedIn = computed(() => {
    return !!user.value?.id;
  });

  async function signOut() {
    user.value = null;
    navigateTo(`${baseURL}/identity/signout`, { external: true });
  }

  return { isLoggedIn, signOut, user };
}
