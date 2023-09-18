<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
      <Icon
        @click="emit('closeModal')"
        :name="'mdi:close'"
        size="24"
        class="absolute right-2 top-2 ease-out hover:cursor-pointer" />

      <h2 class="text-center text-xl uppercase">Create Application</h2>

      <form @submit.prevent>
        <input
          placeholder="Enter your Application name"
          type="text"
          v-model="applicationName"
          class="h-10 w-full border-2 p-2" />
      </form>

      <button
        @click="createApplication"
        :disabled="!applicationName"
        :class="applicationName ? 'text-green-600' : 'text-red-500'">
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  applicationName: { type: String }
});
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
