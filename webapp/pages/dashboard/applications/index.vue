<template>
  <button
    @click="showModal = true"
    class="absolute right-4 top-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
    Create App
  </button>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template>
        <h3>Modal</h3>
      </template>
    </Modal>
  </Teleport>
</template>

<script setup>
import Modal from './modal.vue';

const showModal = ref(false);
</script>
