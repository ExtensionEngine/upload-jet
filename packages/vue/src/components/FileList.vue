<script setup lang="ts">
const props = defineProps<{ files: File[]; nonValidFiles: File[] }>();
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
  <div v-if="props.nonValidFiles.length">
    <div>Not valid files:</div>
    <div v-for="file in props.nonValidFiles" :key="file.size + file.name">
      {{ file.name }}
    </div>
  </div>
</template>
