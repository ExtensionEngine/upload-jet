<script setup>
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['close']);
const { menu } = useMenuLinks();
</script>

<template>
  <div
    @click="$emit('close')"
    v-show="isOpen"
    class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50"></div>
  <aside
    :class="{ '-translate-x-full': !isOpen }"
    class="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-transform duration-300"
    aria-label="Sidebar">
    <div class="h-full overflow-y-auto bg-white px-3 py-4">
      <nav class="flex flex-col space-y-2 font-medium">
        <NuxtLink
          v-for="route in menu"
          @click="$emit('close')"
          :to="route.to"
          :key="route.text"
          class="nav-link text-primary-600 p-4 font-bold">
          <Icon :name="route.icon" size="24" />
          {{ route.text }}
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply text-red-600;
}
</style>
