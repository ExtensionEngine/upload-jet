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
  maxFileCount: { type: Number, default: 1 }
});

const fileInputRef = ref<HTMLInputElement | null>(null);
const openFileInput = () => {
  fileInputRef?.value?.click();
};

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
  selectedFiles.value = [...selectedFiles.value, ...droppedFilesArray];

  isActiveDropzone.value = false;
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
        'active-dropzone': isActiveDropzone
      }"
      @dragenter.prevent="isActiveDropzone = true"
      @dragleave.prevent="isActiveDropzone = false"
      @dragover.prevent="isActiveDropzone = true"
      @drop.prevent="addDroppedFiles"
      class="dropzone">
      <div class="dropzone-content">
        <p class="dropzone-content-message">
          Drag and drop the file you want to upload here
        </p>
        <form @submit.prevent>
          <label for="file-input" class="browse-label">
            <span>Or,</span>
            <br />
            <button @click="openFileInput">Browse files</button>
          </label>
          <input
            @change="addSelectedFiles"
            :multiple="props.maxFileCount > 1"
            ref="fileInputRef"
            type="file"
            class="file-input"
            id="file-input" />

          <div class="submit">
            <button @click="uploadFiles">Upload File to S3</button>
          </div>

          <div>
            <template v-if="selectedFiles.length">
              Selected files:
              <br />
              <span
                v-for="file in selectedFiles"
                :key="file.name + file.lastModified">
                {{ file.name }}
                <br />
              </span>
            </template>
            <template v-else>No files selected.</template>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
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
