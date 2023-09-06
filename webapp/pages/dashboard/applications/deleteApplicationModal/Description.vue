<template>
  <h1>{{ props.title }}</h1>
</template>

<script setup>
const props = defineProps({
  title: { type: String }
});
</script>
