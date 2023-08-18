<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import FileList from './FileList.vue';
import FileDropzone from './FileDropzone.vue';
import FileForm from './FileForm.vue';
import { getMimeType } from '../validationService';
import { useUploadJet } from '../useUploadJet';
import type { UploadedFile, FileType, Errors, ErrorPayload } from '@/types';

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
const errors = ref<Errors>({});
const multiple = computed(() => props.maxFileCount > 1);
const acceptedType = computed(() => getMimeType(props.fileType));
const { upload } = useUploadJet({ url: props.url });

function updateErrors(errorPayload: ErrorPayload[]) {
  errors.value = {};
  for (const { errorType, errorPayload: payload } of errorPayload) {
    if (!errors.value[errorType]) {
      errors.value[errorType] = [];
    }
    errors.value[errorType].push(...payload);
  }
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
  <file-dropzone
    v-model:selected-files="selectedFiles"
    :fileType="acceptedType"
    @error="updateErrors"
    @no-errors="errors = {}">
    <file-form
      @submit="uploadFiles"
      v-model:selected-files="selectedFiles"
      :multiple="multiple"
      :fileType="acceptedType" />
    <file-list :files="selectedFiles" :errors="errors" />
  </file-dropzone>
</template>
