<template>
  <div
    @click="$emit('close')"
    v-show="isOpen"
    class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50"></div>
</template>

<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['close']);
</script>
