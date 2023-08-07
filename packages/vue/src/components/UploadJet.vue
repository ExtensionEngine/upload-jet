<script setup lang="ts">
import { computed, ref } from 'vue';
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

const fileInputRef = ref<HTMLInputElement>();
const selectedFiles = ref<File[]>([]);
const isDropzoneActive = ref(false);
const multiple = computed(() => props.maxFileCount > 1);

const { upload } = useUploadJet({ url: props.url });

const openFileInput = () => {
  fileInputRef.value?.click();
};

function addSelectedFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  selectedFiles.value = [...selectedFiles.value, ...inputElement.files];
}

function addDroppedFiles(e: DragEvent) {
  const droppedFiles = e.dataTransfer?.files;
  if (!droppedFiles?.length) return;
  const droppedFilesArray = [...droppedFiles];
  selectedFiles.value = [...selectedFiles.value, ...droppedFilesArray];
  isDropzoneActive.value = false;
}

async function uploadFiles() {
  if (!selectedFiles.value?.length) return;
  try {
    const result = await upload(selectedFiles.value);
    if (result?.length) emit('upload-complete', result);
  } catch (error: unknown) {
    emit('upload-error', error);
  }
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
      <div>
        Drag and drop {{ multiple ? 'files' : 'the file' }} you want to upload
        here
      </div>
      <form @submit.prevent>
        <label class="browse-label">
          <span>Or,</span>
          <br />
          <button @click="openFileInput">Browse files</button>
          <input
            @change="addSelectedFiles"
            :multiple="multiple"
            ref="fileInputRef"
            type="file"
            class="file-input" />
        </label>

        <div>
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

.dropzone-content {
  text-align: center;
}

.dropzone.active {
  background-color: rgb(20, 56, 44);
}

.browse-label {
  cursor: pointer;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}
</style>
