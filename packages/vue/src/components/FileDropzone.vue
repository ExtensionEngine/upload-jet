<script setup lang="ts">
import { computed, ref } from 'vue';
const emit = defineEmits(['update:selected-files']);

const props = defineProps({
  selectedFiles: { type: Array, default: () => [] }
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

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles?.length) return;
  const droppedFilesArray = [...droppedFiles];
  selectedFiles.value = [...selectedFiles.value, ...droppedFilesArray];
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
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  color: #f8f8f8;
  font-family: sans-serif;
  font-size: 15px;
  border: dashed;
  padding: 3rem 6rem;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  background-color: rgb(28, 37, 48);
}

.dropzone.active {
  background-color: rgb(20, 56, 44);
}

.dropzone-content {
  text-align: center;
}
</style>
