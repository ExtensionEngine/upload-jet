<script setup lang="ts">
const config = useRuntimeConfig();

const authConfig = {
  scope: 'user:email',
  client_id: config.public.githubClientId
};
const searchParams = new URLSearchParams(authConfig).toString();

const githubLoginUrl = new URL('/login/oauth/authorize', 'https://github.com');
githubLoginUrl.search = searchParams;
</script>

<template>
  <a :href="githubLoginUrl">Login with GitHub</a>
</template>
