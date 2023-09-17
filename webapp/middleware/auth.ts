export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, setUser } = useUserStore();
  await useAsyncData(() => setUser());

  if (to.path.startsWith('/dashboard/') && !isLoggedIn.value) {
    return navigateTo('/');
  }
});
