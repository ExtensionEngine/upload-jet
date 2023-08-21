<template>
  <div class="flex flex-grow flex-col border-4 border-x-violet-500">
    <p :class="{ hidden: !isExpanded }">Applications</p>
    <p :class="{ hidden: !isExpanded }">Usage</p>
    <p :class="{ hidden: !isExpanded }">Billings</p>
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean, required: true }
});
</script>

<style scoped></style>
