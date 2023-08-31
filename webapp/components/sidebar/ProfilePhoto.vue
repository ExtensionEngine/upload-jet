<template>
  <div
    :class="{
      'h-10 w-10': !isExpanded,
      'h-20 w-20': isExpanded
    }"
    class="overflow-hidden rounded-full border-2 border-gray-300 object-cover" />
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean }
});
</script>
