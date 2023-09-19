<template>
  <BaseModal
    action-button-text="Create"
    :disable-action-button="!applicationName"
    :action-button-class="
      applicationName
        ? 'bg-green-600 hover:bg-green-500'
        : 'text-red-500 hover:bg-red-500'
    "
    @performAction="createApplication"
    @closeModal="emit('closeModal')">
    <template v-slot:header>
      <h2 class="text-center text-xl uppercase">Create Application</h2>
    </template>
    <template v-slot:content>
      <form @submit.prevent>
        <input
          placeholder="Enter your Application name"
          type="text"
          v-model="applicationName"
          class="h-10 w-full border-2 p-2" />
      </form>
    </template>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  applicationName: { type: String }
});

const emit = defineEmits([
  'closeModal',
  'update:applicationName',
  'create:application'
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
  emit('create:application', applicationName.value);
};
</script>
