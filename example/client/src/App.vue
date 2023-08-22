<script setup lang="ts">
// TODO: Change this import to package name after publishing to npm
import UploadJet from '../../../packages/vue/src/components/UploadJet.vue';

const showErrorDialog = (data: any) => {
  console.log('Error: ', data);
};
const showSuccessDialog = (data: any) => {
  console.log('Success: ', data);
};
</script>

<template>
  <UploadJet
    @upload-error="showErrorDialog"
    @upload-complete="showSuccessDialog"
    url="http://localhost:3001/api/images"
    :maxFileCount="3" />
</template>

<style scoped></style>
