<script setup lang="ts">
definePageMeta({
  name: 'Login'
});

import appLogo from '/img/Logo.png';
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-between py-10 md:justify-center md:gap-12">
    <img :src="appLogo" alt="logo" class="h-20 w-80" />
    <Login />
  </div>
</template>
