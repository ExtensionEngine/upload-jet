<template>
  <Modal
    :action-button-text="buttonText"
    :disable-action-button="false"
    action-button-class=""
    :perform-action="deleteApplication"
    @closeModal="emit('closeModal')">
    <h2 class="text-center text-xl uppercase">Delete Application</h2>
    <h1>Are you sure you want to permanently delete {{ applicationName }}?</h1>
  </Modal>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  applicationName: { type: [String, null] }
});
const buttonText = 'Delete';
const emit = defineEmits(['closeModal', 'deleteApplication']);
const deleteApplication = () => {
  emit('deleteApplication', props.id);
};
</script>
