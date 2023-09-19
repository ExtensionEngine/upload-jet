<template>
  <BaseModal
    action-button-text="Delete"
    :disable-action-button="false"
    action-button-class=""
    @performAction="deleteApplication"
    @closeModal="emit('closeModal')">
    <h2 class="text-center text-xl uppercase">Delete Application</h2>
    <h1>Are you sure you want to permanently delete {{ applicationName }}?</h1>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  applicationName: { type: [String, null] }
});
const emit = defineEmits(['closeModal', 'delete:application']);
const deleteApplication = () => {
  emit('delete:application', props.id);
};
</script>
