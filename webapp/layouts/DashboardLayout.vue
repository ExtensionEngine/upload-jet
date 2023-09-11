<script setup lang="ts">
const { isDesktop } = useBreakpoint();
const cls = computed(() => {
  return isDesktop.value ? 'pl-0' : 'pl-20';
});
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1" :class="[cls]">
      <slot></slot>
      <div>isDesktop: {{ isDesktop }}</div>
      <div>cls: {{ cls }}</div>
    </div>
  </div>
</template>
