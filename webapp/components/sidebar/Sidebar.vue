<script setup>
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['close']);
</script>

<template>
  <Backdrop @close="$emit('close')" :is-open="isOpen" class="lg:hidden" />
  <aside
    :class="{ '-translate-x-full': !isOpen }"
    class="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-16 transition-transform duration-300 lg:block lg:translate-x-0 lg:pt-2"
    aria-label="Sidebar">
    <div class="flex h-full flex-col justify-start overflow-y-auto bg-white">
      <Avatar />
      <SidebarApplicationList @close="$emit('close')" />
      <div class="mt-auto p-4 text-right">
        <AvatarSignout />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply border-r-4 border-gray-800 bg-gray-300 font-bold;
}
</style>
