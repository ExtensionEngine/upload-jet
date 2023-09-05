<template>
  <Transition name="deleteApplicationlicationModal">
    <div
      v-if="show"
      class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
      <div
        class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
        <div class="modal-header">
          <slot name="header">
            <h2 class="text-center text-xl font-semibold">
              Delete Application?
            </h2>
          </slot>
        </div>
        <div class="modal-input">
          <slot name="message">
            <h1>
              Are you sure you want to permanently delete this application?
            </h1>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="button">
            <div class="flex justify-end gap-3">
              <button
                class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400"
                @click="emit('close')">
                Cancel
              </button>
              <button
                class="rounded-sm border-2 bg-red-400 p-2 text-white hover:bg-red-500"
                @click="handleDeleteApplication">
                Delete
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean },
  id: { type: Number }
});
const emit = defineEmits(['close', 'deleteApplication']);
const handleDeleteApplication = () => {
  emit('deleteApplication', props.id);
  emit('close');
};
</script>
