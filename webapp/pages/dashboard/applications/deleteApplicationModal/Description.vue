<template>
  <h1>Are you sure you want to permanently delete {{ applicationName }}?</h1>
</template>

<script setup>
const props = defineProps({
  applicationName: { type: String }
});
</script>
