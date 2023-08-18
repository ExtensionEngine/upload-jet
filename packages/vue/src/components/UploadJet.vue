<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import FileList from './FileList.vue';
import FileDropzone from './FileDropzone.vue';
import FileForm from './FileForm.vue';
import { getMimeType } from '../validationService';
import { useUploadJet } from '../useUploadJet';
import type { UploadedFile, FileType } from '@/types';

const emit = defineEmits<{
  (event: 'upload-complete', payload: UploadedFile[]): void;
  (event: 'upload-error', error: unknown): void;
}>();

const props = defineProps({
  url: { type: String, required: true },
  maxFileCount: { type: Number, default: 1 },
  fileType: {
    type: String as PropType<FileType>,
    default: ''
  }
});
const selectedFiles = ref<File[]>([]);
const multiple = computed(() => props.maxFileCount > 1);
const acceptedType = computed(() => getMimeType(props.fileType));
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
  <file-dropzone
    v-model:selected-files="selectedFiles"
    :fileType="acceptedType">
    <file-form
      @submit="uploadFiles"
      v-model:selected-files="selectedFiles"
      :multiple="multiple"
      :fileType="acceptedType" />
    <file-list :files="selectedFiles" />
  </file-dropzone>
</template>
