<script setup>
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['close']);
</script>

<template>
  <div
    @click="$emit('close')"
    v-show="isOpen"
    class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50"></div>
  <aside
    :class="{ '-translate-x-full': !isOpen }"
    class="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-16 transition-transform duration-300"
    aria-label="Sidebar">
    <div
      class="flex h-full flex-col justify-between overflow-y-auto bg-white py-4">
      <SidebarListItem />
      <div class="pr-4">
        <Signout />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply border-r-4 border-gray-800 bg-gray-300 font-bold;
}
</style>
