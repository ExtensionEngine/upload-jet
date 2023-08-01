<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import uploadFileService from '../services/uploadFileServices.ts';

const uploadEmits = defineEmits(['upload-complete', 'upload-error']);

type Policy = {
  url: string;
  fields: {
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    key: string;
    Policy: string;
    'X-Amz-Signature': string;
    Tagging?: string;
  };
};

type UploadData = {
  fileName: string;
  fileUrl: string;
  fileKey: string;
};

const selectedFiles: Ref<File[]> = ref([]);

function setFiles(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const filesArray = [...inputElement.files];
    filesArray.map(file => selectedFiles.value.push(file));
  }
}

async function handleUpload() {
  if (!selectedFiles.value.length) {
    console.log('Please select a file before uploading.');
    return;
  }
  try {
    const fileName = selectedFiles.value.map(it => it.name);
    const postPoliciesObject = await uploadFileService.getPostPolicy(fileName);
    if (!postPoliciesObject) return;
    const uploadData: UploadData[] = [];

    const pResult = Object.entries(postPoliciesObject).map(
      async ([fileName, policyOptions]) => {
        const formData = new FormData();

        for (const key in policyOptions.fields) {
          const fieldKey = key as keyof Policy['fields'];
          const fieldValue = policyOptions.fields[fieldKey];
          formData.append(fieldKey as string, fieldValue as string);
        }
        const [file] = selectedFiles.value.filter(
          file => file.name === fileName
        );
        formData.append('file', file);

        uploadData.push({
          fileName: fileName,
          fileUrl: `${policyOptions.url}/${policyOptions.fields.key}`,
          fileKey: policyOptions.fields.key
        });
        await uploadFileService.postFileToAWS(policyOptions.url, formData);
      }
    );
    await Promise.all(pResult);
    uploadEmits('upload-complete', uploadData);
  } catch (err) {
    const error = {
      fileName: selectedFiles.value.map(file => file.name),
      message: 'An error occurred during file upload',
      code: '404'
    };
    uploadEmits('upload-error', error);
  }
}
</script>

<template>
  <div class="container">
    <div class="container-content">
      <form @submit.prevent>
        <label for="fileInput" class="browse-label"
          ><p class="browse-link">Browse your file</p></label
        >
        <input
          type="file"
          id="fileInput"
          class="file-input"
          multiple
          @change="setFiles" />
        <div class="submit">
          <button @click="handleUpload">Upload File to Server</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.container {
  border: dashed;
  padding: 3rem 6rem;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  background-color: rgb(28, 37, 48);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container-content {
  text-align: center;
}

.container-content-browse {
  margin-top: 0.5rem;
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
