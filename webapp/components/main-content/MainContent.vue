<template>
  <div class="flex-1" :class="{ 'pl-0': isDesktop, 'pl-20': !isDesktop }">
    <NuxtPage />
  </div>
</template>

<script setup>
const props = defineProps({
  isDesktop: { type: Boolean }
});
</script>
