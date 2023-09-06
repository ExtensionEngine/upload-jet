<template>
  <h1>Are you sure you want to permanently delete {{ appName }}?</h1>
</template>

<script setup>
const props = defineProps({
  appName: { type: String }
});
</script>
