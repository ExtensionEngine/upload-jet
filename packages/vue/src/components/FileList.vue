<script setup lang="ts">
const props = defineProps<{ files: File[]; invalidFiles: File[] }>();
</script>

<template>
  <div v-if="props.files.length">
    <div>Selected files:</div>
    <div v-for="file in props.files" :key="file.size + file.name">
      {{ file.name }}
    </div>
  </div>
  <div v-else>No files selected</div>
  <br />
  <div v-if="props.invalidFiles.length" class="error-message">
    <div>Error:</div>
    <div v-for="file in props.invalidFiles" :key="file.size + file.name">
      File {{ file.name }} is not a vild type
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
