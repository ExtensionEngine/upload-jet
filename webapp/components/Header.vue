<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
</script>

<template>
  <header class="z-50 h-12 w-full bg-white shadow-md">
    <div class="mx-auto flex h-full items-center justify-between px-4">
      <button
        @click="$emit('toggle-sidebar')"
        aria-label="toggle menu"
        class="p-2 md:hidden">
        <Icon v-if="!isOpen" size="30" name="heroicons:bars-3-20-solid" />
        <Icon v-else size="30" name="heroicons:x-mark-20-solid" />
      </button>
      <Avatar class="flex items-center" />
    </div>
  </header>
</template>
