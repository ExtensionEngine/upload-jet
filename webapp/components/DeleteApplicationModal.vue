<template>
  <BaseModal @close:modal="emit('close:modal')">
    <template v-slot:header>
      <h2 class="text-center text-xl uppercase">Delete Application</h2>
    </template>
    <template v-slot:content>
      <h1>
        Are you sure you want to permanently delete {{ applicationName }}?
      </h1>
    </template>
    <template v-slot:footer>
      <button
        @click="emit('close:modal')"
        class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
        Cancel
      </button>
      <button
        @click="emit('delete:application', props.id)"
        class="rounded-sm border-2 bg-gray-500 p-2 text-white hover:bg-red-500">
        Delete
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  applicationName: { type: [String, null] }
});
const emit = defineEmits(['close:modal', 'delete:application']);
</script>
