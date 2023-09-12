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
    class="fixed inset-0 z-30 mt-12 bg-gray-900 bg-opacity-50"></div>
  <aside
    :class="{ '-translate-x-full': !isOpen }"
    class="absolute left-0 z-40 h-screen w-64 overflow-hidden border-r border-gray-200 bg-white pt-12 transition-all duration-300 lg:relative lg:translate-x-0 lg:overflow-visible lg:pt-0"
    aria-label="Sidebar">
    <div class="flex h-full flex-col justify-start overflow-y-auto bg-white">
      <Avatar />
      <SidebarApplicationList @close="$emit('close')" />
      <NuxtLink :to="`/`" class="mt-auto p-4 text-right">
        <p class="text-sm text-gray-400 hover:cursor-pointer hover:underline">
          Signout
        </p>
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply border-r-4 border-gray-800 bg-gray-300 font-bold;
}
</style>
