import { fetchUser, deleteCookie } from '@/services/userService';
import { UserData } from 'types';

export default function useAuth() {
  const user: Ref<UserData | null> = useState('user', () => null);

  async function setUser() {
    const userData = await fetchUser();
    user.value = userData?.value;
  }

  const isLoggedIn = computed(() => {
    return !!user.value?.id;
  });

  async function signOut() {
    user.value = null;
    const success = await deleteCookie();
    if (success.value === 'success') return navigateTo('/');
  }

  return { isLoggedIn, signOut, setUser };
}
