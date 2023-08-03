<script setup lang="ts">
import UploadJet from './components/UploadJet.vue';

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
    @upload-complete="showSuccessDialog" />
</template>

<style scoped></style>
