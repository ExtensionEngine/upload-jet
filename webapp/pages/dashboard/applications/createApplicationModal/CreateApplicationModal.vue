<template>
  <Transition name="createApplicationModal">
    <div
      v-if="show"
      class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
      <div
        class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
        <Icon
          :name="'mdi:close'"
          size="24"
          class="absolute right-2 top-2 ease-out hover:cursor-pointer"
          @click="emit('close')" />

        <Title title="Create Application" />

        <form @submit.prevent>
          <label for="appname" />
          <InputField
            v-model:model-value="inputValue"
            placeholder="Enter your Application name"
            name="applicationName" />
        </form>

        <Button
          :input-value="inputValue"
          title="Create"
          :disabled="!inputValue"
          @click="createApplication"
          :class="inputValue ? 'text-green-600' : 'text-red-500'" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from './Button.vue';
import Title from './Title.vue';
import InputField from './InputField.vue';
const props = defineProps({
  show: { type: Boolean },
  inputValue: { type: String }
});
const emit = defineEmits(['close', 'update:inputValue', 'createApplication']);

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
  emit('close');
  inputValue.value = '';
};
</script>
