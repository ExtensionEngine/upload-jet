<script setup lang="ts">
import { computed, ref } from 'vue';
import accept from 'attr-accept';
import { FileValidationError, errorCode } from '@/types';
import ErrorList from './ErrorList.vue';

const emit = defineEmits(['update:selected-files']);

const props = defineProps({
  selectedFiles: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  fileType: { type: String, default: null }
});

const isDropzoneActive = ref(false);
const errors = ref<FileValidationError[]>([]);

const selectedFiles = computed({
  get() {
    return props.selectedFiles;
  },
  set(newValue) {
    emit('update:selected-files', newValue);
  }
});

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles?.length) return;
  const droppedFilesArray = [...droppedFiles];

  const validFiles = droppedFilesArray.filter(({ type }) =>
    accept({ type }, props.fileType)
  );
  const invalidFiles = droppedFilesArray.filter(
    ({ type }) => !accept({ type }, props.fileType)
  );

  selectedFiles.value = [...selectedFiles.value, ...validFiles];
  errors.value = invalidFiles.length
    ? invalidFiles.map(file => ({
        code: errorCode.INVALID_FILE_TYPE,
        file
      }))
    : [];
  isDropzoneActive.value = false;
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
      <slot></slot>
      <error-list v-if="errors.length" :errors="errors" class="mt-2" />
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

.mt-2 {
  margin-top: 2rem;
}
</style>
