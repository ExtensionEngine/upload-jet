<script setup lang="ts">
import { ref } from 'vue';
import { useUploadJet } from '../useUploadJet';
import type { UploadError, UploadedFile } from '@/types';

const emit = defineEmits<{
  (event: 'upload-complete', payload: UploadedFile[]): void;
  (event: 'upload-error', payload: UploadError[]): void;
}>();

const props = defineProps({
  url: { type: String, required: true },
  maxFileCount: { type: Number, default: 3 }
});

const selectedFiles = ref<File[]>();

function setFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  selectedFiles.value = [...inputElement.files];
}

const { upload } = useUploadJet({ url: props.url });

async function handleUpload() {
  if (!selectedFiles.value) return;
  try {
    const { successfullUploads } = await upload(selectedFiles.value);
    emit('upload-complete', successfullUploads);
  } catch (error) {
    console.log('Error: ', error);
  }
}
</script>

<template>
  <form @submit.prevent="handleUpload">
    <label>
      <input
        type="file"
        class="file-input"
        :multiple="props.maxFileCount > 1"
        @change="setFiles"
        required />
    </label>
    <button type="submit">Upload File to S3</button>
  </form>
</template>
