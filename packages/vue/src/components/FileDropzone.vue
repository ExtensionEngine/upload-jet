<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import {
  isValidTypeFile,
  checkAndReplaceDuplicate
} from '../validationService';

const emit = defineEmits(['update:selected-files', 'update:invalid-files']);

const props = defineProps({
  selectedFiles: { type: Array as PropType<File[]>, default: () => [] },
  multiple: { type: Boolean, default: false },
  fileTypes: { type: String, default: null }
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

  const { validTypeFiles, invalidTypeFiles } = isValidTypeFile(
    droppedFilesArray,
    props.fileTypes
  );
  selectedFiles.value = [...selectedFiles.value, ...validTypeFiles];
  invalidFiles.value = [...invalidFiles.value, ...invalidTypeFiles];

  selectedFiles.value = checkAndReplaceDuplicate(
    droppedFilesArray,
    selectedFiles.value
  );

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
