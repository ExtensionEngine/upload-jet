<template>
  <dialog
    ref="baseModal"
    class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
      <Icon
        @click="emit('close:modal')"
        :name="'mdi:close'"
        size="24"
        class="absolute right-2 top-2 ease-out hover:cursor-pointer" />

      <slot name="header"></slot>
      <slot name="content"></slot>

      <div class="flex justify-end gap-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const baseModal = ref(null);

onMounted(() => {
  baseModal.value.show();
});

const emit = defineEmits(['close:modal']);
</script>
