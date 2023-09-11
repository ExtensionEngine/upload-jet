<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
const { menu } = useMenuLinks();
import User from './sidebar/User.vue';
</script>

<template>
  <header class="fixed z-50 w-full bg-white shadow-md lg:h-16">
    <Container class="flex h-full items-center justify-between px-4">
      <button
        @click="$emit('toggle-sidebar')"
        aria-label="toggle menu"
        class="p-2 lg:hidden">
        <Icon v-if="!isOpen" size="30" name="heroicons:bars-3-20-solid" />
        <Icon v-else size="30" name="heroicons:x-mark-20-solid" />
      </button>

      <nav class="hidden space-x-2 lg:block">
        <NuxtLink
          v-for="route in menu"
          :to="route.to"
          :key="route.text"
          class="nav-link text-primary-600 p-4">
          {{ route.text }}
        </NuxtLink>
      </nav>

      <User />
    </Container>
  </header>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply font-bold underline;
}
</style>
