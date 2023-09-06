<template>
  <button class="text-right">
    {{ props.title }}
  </button>
</template>

<script setup>
const props = defineProps({
  title: { type: String }
});
</script>
