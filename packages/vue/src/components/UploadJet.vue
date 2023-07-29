<script setup lang="ts">
import { ref } from 'vue'
const fileName = ref('')

function handleFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files && inputElement.files.length > 0) {
    fileName.value = inputElement.files[0].name
  }
}
</script>

<template>
  <div class="dropzone">
    <div class="dropzone-content">
      <p class="dropzone-content-message">Drag and drop the file you want to upload here</p>
      <label for="fileInput" class="browse-label"
        >Or, <span class="browse-link">browse your file</span></label
      >
      <input type="file" id="fileInput" class="file-input" @change="handleFileChange" />
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
