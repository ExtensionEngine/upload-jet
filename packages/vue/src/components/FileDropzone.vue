<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import {
  isValidTypeFile,
  isDuplicateFile,
  findIndexToReplace
} from '../validationService';
import { FileType } from '@/types';

const emit = defineEmits(['update:selected-files', 'update:invalid-files']);

const props = defineProps({
  selectedFiles: { type: Array as PropType<File[]>, default: () => [] },
  multiple: { type: Boolean, default: false },
  fileTypes: {
    type: String as PropType<FileType>,
    default: ''
  }
});

const isDropzoneActive = ref(false);
const selectedFiles = computed({
  get() {
    return props.selectedFiles;
  },
  set(newValue) {
    emit('update:selected-files', newValue);
  }
});

const invalidFiles = ref<File[]>([]);

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles?.length) return;
  const droppedFilesArray = [...droppedFiles];
  invalidFiles.value = [];

  droppedFilesArray.forEach(file => {
    const isValidType = isValidTypeFile(file, props.fileTypes);
    const isDuplicate = isDuplicateFile(file.name, selectedFiles.value);
    const index = findIndexToReplace(file, selectedFiles.value);

    !isValidType
      ? invalidFiles.value.push(file)
      : isDuplicate
      ? (selectedFiles.value[index] = file)
      : selectedFiles.value.push(file);

    isDropzoneActive.value = false;
  });
}
</script>

<template>
  <div
    :class="{
      active: isDropzoneActive
    }"
    @dragenter.prevent="isDropzoneActive = true"
    @dragleave.prevent="isDropzoneActive = false"
    @dragover.prevent="isDropzoneActive = true"
    @drop.prevent="addDroppedFiles"
    class="dropzone">
    <div class="dropzone-content">
      <div class="mb-1">
        Drag and drop {{ multiple ? 'files' : 'the file' }} you want to upload
        here
      </div>
      <slot :invalidFiles="invalidFiles"></slot>
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  color: white;
  border: dashed;
  padding: 3rem 6rem;
  border-radius: 5px;
  border-color: white;
  background-color: rgb(28, 37, 48);
}
.dropzone.active {
  background-color: rgb(20, 56, 44);
}

.dropzone-content {
  text-align: center;
}

.mb-1 {
  margin-bottom: 1rem;
}
</style>
