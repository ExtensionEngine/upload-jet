<template>
  <div
    class="relative flex-1"
    :class="{ 'ml-0': isDesktop, 'ml-20': !isDesktop }">
    <NuxtPage />
  </div>
</template>

<script setup>
const props = defineProps({
  isDesktop: { type: Boolean }
});
</script>
