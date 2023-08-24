<script setup lang="ts">
import { UploadJet } from '@upload-jet/vue';

const showSuccessDialog = (data: any) => {
  console.log('Success: ', data);
};

const showErrorDialog = (data: any) => {
  console.log('Error: ', data);
};
</script>

<template>
  <UploadJet
    @upload-complete="showSuccessDialog"
    @upload-error="showErrorDialog"
    url="http://localhost:3001/api/images"
    :maxFileCount="3" />
</template>

<style scoped></style>
