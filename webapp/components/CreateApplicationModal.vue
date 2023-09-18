<template>
  <Modal
    :action-button-text="buttonText"
    :disable-action-button="!applicationName"
    :action-button-class="
      applicationName
        ? 'bg-green-600 hover:bg-green-500'
        : 'text-red-500 hover:bg-red-500'
    "
    :perform-action="createApplication"
    @closeModal="emit('closeModal')">
    <h2 class="text-center text-xl uppercase">Create Application</h2>
    <form @submit.prevent>
      <input
        placeholder="Enter your Application name"
        type="text"
        v-model="applicationName"
        class="h-10 w-full border-2 p-2" />
    </form>
  </Modal>
</template>

<script setup>
const props = defineProps({
  applicationName: { type: String }
});

const buttonText = 'Create';

const emit = defineEmits([
  'closeModal',
  'update:applicationName',
  'createApplication'
]);

const applicationName = computed({
  get() {
    return props.applicationName;
  },
  set(newValue) {
    emit('update:applicationName', newValue);
  }
});

const createApplication = () => {
  emit('createApplication', applicationName.value);
};
</script>
