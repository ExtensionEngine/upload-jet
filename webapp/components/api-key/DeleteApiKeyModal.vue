<template>
  <BaseModal ref="baseModalRef">
    <template v-slot:header>
      <h2 class="text-center text-xl uppercase">Delete Api Key</h2>
    </template>
    <template v-slot:content>
      <p>Are you sure you want to permanently delete api key?</p>
    </template>
    <template v-slot:footer>
      <button @click="closeModal" class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
        Cancel
      </button>
      <button @click="emit('delete:api-key')" class="rounded-sm border-2 bg-gray-500 p-2 text-white hover:bg-red-500">
        Delete
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
const baseModalRef = ref();
const { showModal, closeModal } = useModal(baseModalRef);

defineExpose({
  showModal,
  closeModal
});

const emit = defineEmits(['delete:api-key']);
</script>
