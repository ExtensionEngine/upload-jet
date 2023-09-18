export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn } = await useAuth();

  if (to.path.includes('dashboard') && !isLoggedIn.value) {
    return navigateTo({ name: 'Login' });
  }
});
