<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
      <Icon
        :name="'mdi:close'"
        size="24"
        class="absolute right-2 top-2 ease-out hover:cursor-pointer"
        @click="emit('closeModal')" />

      <h2 class="text-center text-xl uppercase">Create Application</h2>

      <form @submit.prevent>
        <label for="applicationName" />
        <input
          placeholder="Enter your Application name"
          type="text"
          v-model="inputValue"
          class="h-10 w-full border-2 p-2" />
      </form>

      <button
        :disabled="!inputValue"
        @click="createApplication"
        :class="inputValue ? 'text-green-600' : 'text-red-500'">
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  inputValue: { type: String }
});
const emit = defineEmits([
  'closeModal',
  'update:inputValue',
  'createApplication'
]);

const inputValue = computed({
  get() {
    return props.inputValue;
  },
  set(newValue) {
    emit('update:inputValue', newValue);
  }
});

const createApplication = () => {
  emit('createApplication', inputValue.value);
  emit('closeModal');
  inputValue.value = '';
};
</script>
