import { UserData } from 'types';

export default async function useAuth() {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;

  const user: Ref<UserData | null> = useState('user', () => null);

  const { data } = await useApiFetch('identity/me', { method: 'GET' });
  user.value = data.value as UserData;

  const isLoggedIn = computed(() => {
    return !!user.value;
  });

  async function signOut() {
    user.value = null;
    const signoutUrl = new URL('identity/signout', baseURL);
    navigateTo(signoutUrl.href, { external: true });
  }

  return { isLoggedIn, signOut, user };
}
