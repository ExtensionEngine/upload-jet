<script setup lang="ts">
import { FileValidationError } from '@/types';
import { PropType } from 'vue';

const props = defineProps({
  errors: {
    type: Array as PropType<FileValidationError[]>,
    default: () => []
  }
});
</script>

<template>
  <div>
    <div>Error list:</div>
    <div v-for="{ code, file } in props.errors" :key="file.name">
      Error: {{ code }} for file {{ file.name }}
    </div>
  </div>
</template>
