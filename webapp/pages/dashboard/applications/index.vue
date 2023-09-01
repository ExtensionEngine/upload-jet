<template>
  <button
    @click="showModal = true"
    class="absolute rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
    :class="
      isDesktop
        ? 'right-4 top-4'
        : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
    ">
    Create App
  </button>

  <div class="mt-20 p-10">
    <li
      class="mb-4 flex h-14 list-none items-center rounded-lg border-2 bg-slate-50 pl-4 duration-200 ease-out hover:scale-105 hover:cursor-pointer hover:border-cyan-500"
      v-for="app in mockedApps">
      {{ app }}
    </li>
  </div>

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

const mockedApps = ref([
  'Mocked App 1',
  'Mocked App 2',
  'Mocked App 3',
  'Mocked App 4'
]);
</script>
