<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits(['update:selected-files', 'submit']);

const props = defineProps({
  selectedFiles: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false }
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
  selectedFiles.value = [...selectedFiles.value, ...inputElement.files];
}
</script>

<template>
  <form @submit.prevent="emit('submit', $event)">
    <label class="browse-label">
      <button @click="fileInputRef?.click()">Browse files</button>
      <input
        @change="addSelectedFiles"
        :multiple="multiple"
        ref="fileInputRef"
        type="file"
        class="file-input" />
    </label>
    <div>
      <button>Upload File to S3</button>
    </div>
  </form>
</template>

<style scoped>
.browse-label {
  cursor: pointer;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}
</style>
