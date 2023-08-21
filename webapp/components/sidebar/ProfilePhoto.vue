<template>
  <div
    :class="isExpanded ? 'h-20 w-20' : 'h-10 w-10'"
    class="overflow-hidden rounded-full border-2 border-gray-300 object-cover" />
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean, default: false }
});
</script>
