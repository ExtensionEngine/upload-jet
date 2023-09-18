<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
      <h2 class="text-center text-xl font-semibold">Delete Application?</h2>

      <h1>
        Are you sure you want to permanently delete {{ applicationName }}?
      </h1>

      <div class="flex justify-end gap-3">
        <button
          @click="emit('closeModal')"
          class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
          Cancel
        </button>
        <button
          @click="deleteApplication"
          class="rounded-sm border-2 bg-red-400 p-2 text-white hover:bg-red-500">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  applicationName: { type: [String, null] }
});
const emit = defineEmits(['closeModal', 'deleteApplication']);
const deleteApplication = () => {
  emit('deleteApplication', props.id);
};
</script>
