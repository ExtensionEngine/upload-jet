<template>
  <button
    @click="showModal = true"
    class="absolute rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
    :class="
      isDesktop
        ? 'right-4 top-4'
        : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
    ">
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

const props = defineProps({
  isDesktop: { type: Boolean }
});
</script>
