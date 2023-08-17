<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits(['update:selected-files', 'submit']);

const props = defineProps({
  selectedFiles: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  fileType: { type: String, default: undefined }
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
  const inputFilesArray = Array.from(inputElement.files);
  selectedFiles.value = [...selectedFiles.value, ...inputFilesArray];
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
        :accept="props.fileType"
        class="file-input" />
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
