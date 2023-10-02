<script setup lang="ts">
import GithubLogo from '/img/Github.png';

const config = useRuntimeConfig();
const route = useRoute();
const { isLoggedIn } = await useAuth();

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
  <div
    class="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-white outline-none"
    v-if="!isLoggedIn">
    <img :src="GithubLogo" alt="github" class="h-full" />
    <NuxtLink :href="githubLoginUrl.href"> Login with GitHub </NuxtLink>
  </div>

  <NuxtLink
    v-else
    :to="{ name: 'Applications' }"
    class="h-10 cursor-pointer rounded-md bg-sky-600 px-3 py-2 text-white outline-none">
    Go to dashboard
  </NuxtLink>
</template>
