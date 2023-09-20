<template>
  <BaseModal ref="baseModalRef">
    <template #header>
      <h2 class="text-center text-xl uppercase">Create Application</h2>
    </template>
    <template #content>
      <form @submit.prevent>
        <input
          placeholder="Enter your Application name"
          type="text"
          v-model="applicationName"
          class="h-10 w-full border-2 p-2" />
      </form>
    </template>
    <template #footer>
      <button
        @click="closeModal"
        class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
        Cancel
      </button>
      <button
        @click="emit('create:application', applicationName)"
        :disabled="!applicationName"
        class="text-whit rounded-sm border-2 bg-gray-500 p-2"
        :class="{ 'bg-green-500 hover:bg-green-400': applicationName }">
        Create
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
const props = defineProps({
  applicationName: { type: String }
});

const baseModalRef = ref();
const { showModal, closeModal } = useModal(baseModalRef);

defineExpose({
  showModal,
  closeModal
});

const emit = defineEmits(['update:applicationName', 'create:application']);

const applicationName = computed({
  get() {
    return props.applicationName;
  },
  set(newValue) {
    emit('update:applicationName', newValue);
  }
});
</script>
