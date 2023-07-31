<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits(['upload-complete', 'upload-error'])

import uploadFileService from '../services/uploadFileServices'

type EachPolicy = {
  url: string
  fields: {
    Tagging?: string
    bucket: string
    'X-Amz-Algorithm': string
    'X-Amz-Credential': string
    'X-Amz-Date': string
    key: string
    Policy: string
    'X-Amz-Signature': string
  }
}

type UploadData = {
  fileName: string
  fileUrl: string
  fileKey: string
}

const fileName: Ref<string[]> = ref([])
const files = ref<File[]>([])

function handleFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files && inputElement.files.length > 0) {
    fileName.value.push(inputElement.files[0].name)
    files.value.push(inputElement.files[0])
  }
}

async function handleUpload() {
  if (fileName.value.length === 0) {
    console.log('Please select a file before uploading.')
  } else {
    try {
      const postPoliciesObject = await uploadFileService.getPostPolicy(fileName.value)
      if (!postPoliciesObject) return
      const uploadData: UploadData[] = []

      const pResult = Object.entries(postPoliciesObject).map(async ([fileName, policyOptions]) => {
        const formData = new FormData()

        for (const key in policyOptions.fields) {
          const fieldKey = key as keyof EachPolicy['fields']
          const fieldValue = policyOptions.fields[fieldKey]
          formData.append(fieldKey as string, fieldValue as string)
        }
        const [file] = files.value.filter((file) => file.name === fileName)
        formData.append('file', file)

        uploadData.push({
          fileName: fileName,
          fileUrl: `${policyOptions.url}/${policyOptions.fields.key}`,
          fileKey: policyOptions.fields.key
        })
        await uploadFileService.postFileToAWS(policyOptions.url, formData)
      })
      await Promise.all(pResult)
      emit('upload-complete', uploadData)
      throw new Error()
    } catch (err) {
      const error = {
        fileName: fileName.value,
        message: 'An error occurred during file upload',
        code: '404'
      }
      emit('upload-error', error)
    }
  }
}
</script>

<template>
  <div class="dropzone">
    <div class="dropzone-content">
      <p class="dropzone-content-message">Drag and drop the file you want to upload here</p>

      <form @submit.prevent>
        <label for="fileInput" class="browse-label"
          >Or, <span class="browse-link">browse your file</span></label
        >
        <input type="file" id="fileInput" class="file-input" multiple @change="handleFileChange" />
        <div class="submit">
          <button @click="handleUpload">Upload File to Server</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.dropzone {
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
.dropzone-content {
  text-align: center;
}

.dropzone-content-browse {
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
