<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
const { menu } = useMenuLinks();
</script>

<template>
  <header class="fixed z-50 w-full bg-white shadow-md">
    <Container class="flex items-center justify-between px-4 sm:px-0">
      <div>Logo</div>
      <nav class="hidden space-x-2 lg:block">
        <NuxtLink
          v-for="route in menu"
          :to="route.to"
          :key="route.text"
          class="nav-link text-primary-600 p-4 font-bold">
          {{ route.text }}
        </NuxtLink>
      </nav>
      <button
        @click="$emit('toggle-sidebar')"
        aria-label="toggle menu"
        class="p-2 lg:hidden">
        <Icon v-if="!isOpen" size="30" name="heroicons:bars-3-20-solid" />
        <Icon v-else size="30" name="heroicons:x-mark-20-solid" />
      </button>
    </Container>
  </header>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply text-red-600;
}
</style>
