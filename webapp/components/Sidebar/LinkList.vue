<template>
  <nav class="flex flex-col space-y-2">
    <NuxtLink v-for="route in menu" @click="$emit('close')" :to="route.to" :key="route.text"
      class="nav-link p-4 duration-200 ease-out hover:bg-slate-300">
      <Icon :name="route.icon" size="24" class="mr-4" />
      {{ route.text }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { menu } = useMenuLinks();
defineEmits(['close']);
</script>

<style scoped>
.nav-link.router-link-active {
  @apply border-r-4 border-gray-800 bg-gray-300;
}
</style>
