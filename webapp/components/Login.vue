<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const authConfig = {
  scope: 'user:email',
  state: route.path,
  client_id: config.public.githubClientId
};
const searchParams = new URLSearchParams(authConfig).toString();

const githubLoginUrl = new URL('https://github.com/login/oauth/authorize');
githubLoginUrl.search = searchParams;
</script>

<template>
  <a :href="githubLoginUrl.href">Login with GitHub</a>
</template>
