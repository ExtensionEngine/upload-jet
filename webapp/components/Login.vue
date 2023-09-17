<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { logIn, isLoggedIn } = useUserStore();

logIn();

const authConfig = {
  scope: 'user:email',
  state: JSON.stringify({ targetUrl: route.fullPath }),
  client_id: config.public.githubClientId
};
const searchParams = new URLSearchParams(authConfig).toString();
const githubLoginUrl = new URL('https://github.com/login/oauth/authorize');
githubLoginUrl.search = searchParams;
</script>

<template>
  <a
    v-if="!isLoggedIn"
    :href="githubLoginUrl.href"
    class="cursor-pointer rounded-md bg-sky-600 px-3 py-2 text-white outline-none">
    Login with GitHub
  </a>

  <NuxtLink v-else :to="'/dashboard/applications'">
    <button
      class="cursor-pointer rounded-md bg-sky-600 px-3 py-2 text-white outline-none">
      Go to dashboard
    </button>
  </NuxtLink>
</template>
