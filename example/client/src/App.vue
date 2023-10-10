<script setup lang="ts">
import { UploadJet } from '@upload-jet/vue';
import '@upload-jet/vue/style.css';

const showSuccessDialog = (data: any) => {
  console.log('Success: ', data);
};

const showErrorDialog = (data: any) => {
  console.log('Error: ', data);
};

const URL = 'http://localhost:3001/api/images';
</script>

<template>
  <UploadJet
    @upload-complete="showSuccessDialog"
    @upload-error="showErrorDialog"
    :url="URL"
    :maxFileCount="3"
    fileType="image" />
</template>

<style scoped></style>
