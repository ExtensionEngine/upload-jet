<script setup lang="ts">
import { computed, ref } from 'vue';
import accept from 'attr-accept';

const emit = defineEmits(['update:selected-files', 'update:invalid-files']);

const props = defineProps({
  selectedFiles: { type: Array, default: () => [] },
  nonValidFiles: { type: Array, default: () => [] },
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

const nonValidFiles = computed({
  get() {
    return props.nonValidFiles;
  },
  set(newValue) {
    emit('update:non-valid-files', newValue);
  }
});

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles?.length) return;
  const droppedFilesArray = [...droppedFiles];
  droppedFilesArray.forEach(file => {
    if (accept({ type: file.type }, props.fileTypes)) {
      selectedFiles.value = [...selectedFiles.value, file];
    } else {
      nonValidFiles.value.push(file);
    }
  });
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
