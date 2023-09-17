import userService from '@/services/userService';

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

  async function setUser() {
    const userData = await userService.fetchUser();
    user.value = userData?.value;
  }

  const isLoggedIn = computed(() => {
    return !!user.value?.id;
  });

  async function signOut() {
    user.value = null;
    const success = await userService.deleteCookie();
    if (success.value === 'success') return navigateTo('/');
  }

  return { user, isLoggedIn, signOut, setUser };
}
