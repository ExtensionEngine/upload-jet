<template>
  <div class="flex-1 pl-20" :class="{ 'pl-0': isDesktop }">
    <NuxtPage />
  </div>
</template>

<script setup>
const props = defineProps({
  isDesktop: { type: Boolean }
});
</script>
