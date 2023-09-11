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
    <div
      class="flex h-full flex-col justify-between overflow-y-auto bg-white py-4">
      <nav class="flex flex-col space-y-2 font-medium">
        <NuxtLink
          v-for="route in menu"
          @click="$emit('close')"
          :to="route.to"
          :key="route.text"
          class="nav-link text-primary-600 p-4 duration-200 ease-out hover:bg-slate-300">
          <Icon :name="route.icon" size="24" class="mr-4" />
          {{ route.text }}
        </NuxtLink>
      </nav>
      <NuxtLink :to="`/`">
        <p
          class="mb-4 mr-4 text-right text-sm text-gray-400 hover:cursor-pointer hover:underline">
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
