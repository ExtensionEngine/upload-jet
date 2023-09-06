<template>
  <h2 class="text-center text-xl uppercase">{{ props.title }}</h2>
</template>

<script setup>
const props = defineProps({
  title: { type: String }
});
</script>
