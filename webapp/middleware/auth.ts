export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn } = await useAuth();

  if (to.path.startsWith('/dashboard/') && !isLoggedIn.value) {
    return navigateTo('/');
  }
});
