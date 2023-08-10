<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import { useUploadJet } from '../useUploadJet';
import type { UploadedFile } from '@/types';
import FileList from './FileList.vue';
import FileDropzone from './FileDropzone.vue';
import FileForm from './FileForm.vue';
import { exportAcceptedTypes } from '../validationService';

const emit = defineEmits<{
  (event: 'upload-complete', payload: UploadedFile[]): void;
  (event: 'upload-error', error: unknown): void;
}>();

const props = defineProps({
  url: { type: String, required: true },
  maxFileCount: { type: Number, default: 3 },
  fileTypes: {
    type: Array as PropType<string[]>,
    default: () => ['image']
  }
});

const selectedFiles = ref<File[]>([]);
const nonValidFiles = ref<File[]>([]);
const multiple = computed(() => props.maxFileCount > 1);
const acceptedTypes = computed(() => exportAcceptedTypes(props.fileTypes));
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
    v-model:non-valid-files="nonValidFiles"
    :fileTypes="acceptedTypes">
    <file-form
      @submit="uploadFiles"
      v-model:selected-files="selectedFiles"
      :multiple="multiple"
      :fileTypes="acceptedTypes" />
    <file-list :files="selectedFiles" :nonValidFiles="nonValidFiles" />
  </file-dropzone>
</template>
