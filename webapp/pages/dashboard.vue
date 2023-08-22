<template>
  <NuxtLayout name="dashboard-layout">
    <template #sidebar>
      <Sidebar />
    </template>

    <template #maincontent>
      <MainContent />
    </template>
  </NuxtLayout>
</template>

<script setup>
const router = useRouter();

if (router.currentRoute.value.path === '/dashboard/') {
  router.replace('/dashboard/applications');
}
</script>
