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

const selectedFiles = ref<File[]>();

function setFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) return;
  selectedFiles.value = [...inputElement.files];
}

const { upload } = useUploadJet({ url: props.url });

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
