<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['close']);
const { signOut } = await useAuth();
</script>

<template>
  <aside
    :class="{ '-translate-x-full': !isOpen }"
    class="absolute left-0 z-40 h-screen w-64 overflow-hidden border-r border-gray-200 bg-white pt-16 transition-all duration-300 md:relative md:translate-x-0 md:pt-0"
    aria-label="Sidebar">
    <div class="flex h-full flex-col justify-start bg-white">
      <Avatar class="hidden md:inline-flex" />
      <SidebarLinkList @close="$emit('close')" />
      <div class="mt-auto p-4 text-right">
        <button
          @click="signOut"
          class="w-full rounded-sm bg-gray-400 px-4 py-2 font-semibold text-white md:inline-flex md:w-auto md:bg-transparent md:text-sm md:font-light md:text-gray-400 md:hover:cursor-pointer md:hover:underline">
          Signout
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  @apply border-r-4 border-gray-800 bg-gray-300 font-bold;
}
</style>
