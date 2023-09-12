<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
</script>

<template>
  <header class="z-50 w-full bg-white shadow-md">
    <div class="mx-auto flex h-full items-center justify-between px-4">
      <HeaderButton
        @toggle-sidebar="$emit('toggle-sidebar')"
        :is-open="isOpen" />
    </div>
  </header>
</template>
