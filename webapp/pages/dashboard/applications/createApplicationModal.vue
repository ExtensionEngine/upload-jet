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
          class="hover: absolute right-2 top-2 ease-out hover:cursor-pointer"
          @click="emit('close')" />
        <div class="modal-header">
          <slot name="header">
            <h2 class="text-center text-xl uppercase">Create Application</h2>
          </slot>
        </div>
        <div class="modal-input">
          <slot name="input">
            <form @submit.prevent>
              <label for="appname"></label>
              <input
                v-model="inputValue"
                type="text"
                id="appname"
                name="appname"
                placeholder="Enter you Application name"
                class="h-10 w-full border-2 p-2" />
            </form>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="button">
            <button
              class="float-right"
              :class="inputValue ? 'text-green-600' : 'text-red-500'"
              :disabled="!inputValue"
              @click="handleCreateApplication">
              Create
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
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

const handleCreateApplication = () => {
  emit('createApplication', inputValue.value);
  emit('close');
  inputValue.value = '';
};
</script>
