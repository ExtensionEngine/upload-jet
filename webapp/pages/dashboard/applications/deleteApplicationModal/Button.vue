<template>
  <button class="rounded-sm border-2 p-2" :class="buttonStyle">
    {{ props.title }}
  </button>
</template>

<script setup>
const props = defineProps({
  buttonStyle: { type: String },
  title: { type: String }
});
</script>
