<template>
  <BaseModal ref="baseModalRef">
    <template v-slot:header>
      <h2 class="text-center text-xl uppercase">Create Api Key</h2>
    </template>
    <template v-slot:content>
      <p>Are you sure you want to create new api key?</p>
      <p>Keep this key safe and do not share it publicly. If you lose it, you will need to create a new one</p>
    </template>
    <template v-slot:footer>
      <button @click="closeModal" class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
        Cancel
      </button>
      <button @click="emit('create:api-key')" class="rounded-sm border-2 bg-gray-500 p-2 text-white hover:bg-green-500">
        Create
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

const emit = defineEmits(['create:api-key']);
</script>
