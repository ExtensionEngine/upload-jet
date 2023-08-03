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
  maxFileCount: { type: Number, default: 1 }
});

const selectedFiles = ref<File[]>();

function setFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  selectedFiles.value = [...inputElement.files];
}

const { upload } = useUploadJet({ url: props.url });

async function uploadFiles() {
  if (!selectedFiles.value) return;
  const { successfullUploads, failedUploads } = await upload(
    selectedFiles.value
  );
  successfullUploads.length > 0 && emit('upload-complete', successfullUploads);
  failedUploads.length > 0 && emit('upload-error', failedUploads);
}
</script>

<template>
  <form @submit.prevent="uploadFiles">
    <label>
      <input
        @change="setFiles"
        :multiple="props.maxFileCount > 1"
        type="file"
        required
        class="file-input" />
    </label>
    <button type="submit">Upload File to S3</button>
  </form>
</template>
