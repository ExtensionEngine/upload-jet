<script setup lang="ts">
import { computed, ref } from 'vue';
import { findIndexToReplace, isDuplicateFile } from '@/validationService';

const emit = defineEmits(['update:selected-files', 'submit']);

const props = defineProps({
  selectedFiles: { type: Array as () => File[], default: () => [] },
  multiple: { type: Boolean, default: false },
  fileTypes: { type: String, default: undefined }
});

const fileInputRef = ref<HTMLInputElement>();
const selectedFiles = computed({
  get() {
    return props.selectedFiles;
  },
  set(newValue) {
    emit('update:selected-files', newValue);
  }
});

function addSelectedFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  const inputFilesArray = [...inputElement.files];
  inputFilesArray.forEach(file => {
    const isDuplicate = isDuplicateFile(file.name, props.selectedFiles);
    if (isDuplicate) {
      const index = findIndexToReplace(file, props.selectedFiles);
      selectedFiles.value[index] = file;
      return;
    }
    selectedFiles.value.push(file);
  });
}
</script>

<template>
  <form @submit.prevent="emit('submit', $event)">
    <label class="browse-label">
      <button @click="fileInputRef?.click()" type="button">Browse files</button>
      <input
        @change="addSelectedFiles"
        :multiple="multiple"
        ref="fileInputRef"
        type="file"
        class="file-input"
        :accept="props.fileTypes" />
    </label>
    <div class="mt-1">
      <button>Upload File to S3</button>
    </div>
  </form>
</template>

<style scoped>
.browse-label {
  cursor: pointer;
}

.mt-1 {
  margin-top: 1rem;
}

.file-input {
  display: none;
}
</style>
