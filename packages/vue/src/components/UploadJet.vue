<script setup lang="ts">
import { ref } from 'vue';
import { useUploadJet } from '../useUploadJet';
import type { UploadedFile } from '@/types';

const emit = defineEmits<{
  (event: 'upload-complete', payload: UploadedFile[]): void;
  (event: 'upload-error', error: unknown): void;
}>();

const props = defineProps({
  url: { type: String, required: true },
  maxFileCount: { type: Number, default: 1 },
  enableDragDrop: { type: Boolean, default: false }
});

const selectedFiles = ref<File[]>([]);
const isActiveDropzone = ref(false);
const { upload } = useUploadJet({ url: props.url });

function addSelectedFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  selectedFiles.value = [...selectedFiles.value, ...inputElement.files];
}

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files as FileList;
  const droppedFilesArray = [...droppedFiles];
  droppedFilesArray.map(file => {
    selectedFiles.value.push(file);
  });
  isActiveDropzone.value = false;
}

function toggleActiveDropZone() {
  isActiveDropzone.value = !isActiveDropzone.value;
}

async function uploadFiles() {
  if (!selectedFiles.value) return;
  try {
    const result = await upload(selectedFiles.value);
    if (result?.length) emit('upload-complete', result);
  } catch (error: unknown) {
    emit('upload-error', error);
  }
}
</script>

<template>
  <div class="main-container">
    <div
      :class="{
        dropzone: enableDragDrop,
        'active-dropzone': isActiveDropzone && enableDragDrop
      }"
      @dragenter.prevent="toggleActiveDropZone"
      @dragleave.prevent="toggleActiveDropZone"
      @dragover.prevent
      @drop.prevent="addDroppedFiles">
      <div class="dropzone-content">
        <p v-if="props.enableDragDrop" class="dropzone-content-message">
          Drag and drop the file you want to upload here
        </p>
        <form @submit.prevent>
          <label for="file-input" class="browse-label"
            ><span v-if="enableDragDrop">Or, </span>
            <span class="browse-link">browse your file</span></label
          >
          <input
            @change="addSelectedFiles"
            :multiple="props.maxFileCount > 1"
            type="file"
            class="file-input"
            id="file-input" />
          <div class="submit">
            <button @click="uploadFiles">Upload File to S3</button>
          </div>

          <p>
            <template v-if="selectedFiles.length > 0">
              Selected files:<br />
              <span v-for="(file, index) in selectedFiles" :key="index"
                >{{ file.name }}<br
              /></span>
            </template>
            <template v-else>No files selected.</template>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: #f8f8f8;
  background: #181818;
  transition:
    color 0.5s,
    background-color 0.5s;
  line-height: 1.6;
  font-family: sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dropzone {
  border: dashed;
  padding: 3rem 6rem;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  background-color: rgb(28, 37, 48);
}

.dropzone-content {
  text-align: center;
}

.dropzone-content-browse {
  margin-top: 0.5rem;
}

.active-dropzone {
  background-color: rgb(20, 56, 44);
}

.browse-label {
  cursor: pointer;
  margin-bottom: 10px;
}

.browse-link {
  text-decoration: underline;
}

.file-input {
  display: none;
}
</style>
