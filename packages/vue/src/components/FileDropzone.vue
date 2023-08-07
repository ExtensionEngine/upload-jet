<script setup lang="ts">
import { computed } from 'vue';
const emit = defineEmits(['update:is-active', 'update:selected-files']);

const props = defineProps({
  isActive: { type: Boolean, default: false },
  selectedFiles: { type: Array, default: () => [] }
});

const isActive = computed({
  get() {
    return props.isActive;
  },
  set(newValue) {
    emit('update:is-active', newValue);
  }
});

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
  isActive.value = false;
}
</script>

<template>
  <div
    :class="{
      active: isActive
    }"
    @dragenter.prevent="isActive = true"
    @dragleave.prevent="isActive = false"
    @dragover.prevent="isActive = true"
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
