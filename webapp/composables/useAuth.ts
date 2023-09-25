import { Identity } from 'types';

export default async function useAuth() {
  const config = useRuntimeConfig();
  const { apiBaseUrl: baseURL } = config.public;

  const user: Ref<Identity | null> = useState('user', () => null);

  if (!user.value) {
    const { data } = await useApiFetch<Identity>('identity/me');
    user.value = data.value;
  }

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
