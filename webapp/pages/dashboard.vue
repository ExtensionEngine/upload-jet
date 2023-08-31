<template>
  <NuxtLayout name="dashboard-layout">
    <template #sidebar>
      <Sidebar :is-mobile="isMobile" :is-desktop="isDesktop" />
    </template>

    <template #maincontent>
      <MainContent :is-desktop="isDesktop" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual('lg');
const isDesktop = breakpoints.greaterOrEqual('lg');

const router = useRouter();
if (router.currentRoute.value.path === '/dashboard/') {
  router.replace('/dashboard/applications');
}
</script>
