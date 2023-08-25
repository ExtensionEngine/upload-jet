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
  <a class="github-login" :href="githubLoginUrl.href">Login with GitHub</a>
</template>

<style scoped>
.github-login {
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 0.25rem;
}
</style>
