<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUploadJet } from '../useUploadJet';
import type { UploadedFile } from '@/types';
import FileList from './FileList.vue';
import FileDropzone from './FileDropzone.vue';
import FileForm from './FileForm.vue';

const emit = defineEmits<{
  (event: 'upload-complete', payload: UploadedFile[]): void;
  (event: 'upload-error', error: unknown): void;
}>();

const props = defineProps({
  url: { type: String, required: true },
  maxFileCount: { type: Number, default: 1 }
});

const selectedFiles = ref<File[]>([]);

const multiple = computed(() => props.maxFileCount > 1);

const { upload } = useUploadJet({ url: props.url });

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
  <file-dropzone v-model:selected-files="selectedFiles">
    <file-form
      @submit="uploadFiles"
      v-model:selected-files="selectedFiles"
      :multiple="multiple" />
    <file-list :files="selectedFiles" />
  </file-dropzone>
</template>
