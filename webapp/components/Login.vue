<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

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
    :href="githubLoginUrl.href"
    class="cursor-pointer rounded-md bg-sky-600 px-3 py-2 text-white outline-none">
    Login with GitHub
  </a>
</template>
