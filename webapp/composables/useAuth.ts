// import { fetchUser, deleteCookie } from '@/services/userService';
import { UserData } from 'types';

export default async function useAuth() {
  const { apiFetch } = useApiFetch();

  const user: Ref<UserData | null> = useState('user', () => null);

  async function setUser() {
    const response = await apiFetch('identity/me');
    user.value = await response.json();
  }

  await setUser();

  const isLoggedIn = computed(() => {
    return !!user.value?.id;
  });

  async function signOut() {
    user.value = null;
    const response = await apiFetch('identity/signout');
    if (response.ok) return navigateTo('/');
  }

  return { isLoggedIn, signOut, setUser, user };
}
