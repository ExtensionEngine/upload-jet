<script setup lang="ts">
const config = useRuntimeConfig();

const authConfig = {
  scope: 'user:email',
  client_id: config.public.githubClientId
};

const authParams = new URLSearchParams(authConfig).toString();
const githubLoginUrl = `https://github.com/login/oauth/authorize?${authParams}`;
</script>
<template>
  <a :href="githubLoginUrl">Login with GitHub</a>
</template>
