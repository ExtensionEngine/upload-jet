<script setup lang="ts">
import { FileValidationError } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  files: File[];
  errors: FileValidationError[];
}>();

const hasErrors = computed(() => props.errors?.length);
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
  <div v-if="hasErrors" class="error-message">
    <div>Error:</div>
    <div v-for="{ code, file } in props.errors" :key="file.name">
      Error {{ code }}: for file {{ file.name }}
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
