<script setup lang="ts">
import { computed } from 'vue';
import { Errors } from '@/types';

const props = defineProps<{
  files: File[];
  errors: Errors;
}>();

const hasErrors = computed(() => {
  for (const key in props.errors) {
    if (props.errors[key].length > 0) {
      return true;
    }
  }
  return false;
});
</script>

<template>
  <div>{{ props.errors }}</div>
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

    <div v-for="(files, errorType) in props.errors" :key="errorType">
      <div>{{ errorType }}:</div>
      <div v-for="file in files" :key="file.size + file.name">
        File {{ file.name }} is not a valid type
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
