<template>
  <nav class="hidden space-x-2 lg:block">
    <NuxtLink
      v-for="route in menu"
      :to="route.to"
      :key="route.text"
      class="nav-link text-primary-600 p-4">
      {{ route.text }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const { menu } = useMenuLinks();
</script>

<style scoped>
.nav-link.router-link-exact-active {
  @apply font-bold underline;
}
</style>
