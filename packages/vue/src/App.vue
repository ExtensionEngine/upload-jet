<script setup lang="ts">
import UploadJet from './components/UploadJet.vue';

const log = (data: any) => {
  console.log('Data: ', data);
};
</script>

<template>
  <UploadJet @upload-complete="log" />
</template>

<style scoped></style>
