<template>
  <dialog ref="baseModalRef">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 bg-white p-5 pl-7 shadow-md">
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="error"></slot>

      <div class="flex justify-end gap-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const baseModalRef = ref<HTMLDialogElement>();

const showModal = () => {
  baseModalRef.value?.showModal();
};

const closeModal = () => {
  baseModalRef.value?.close();
};

defineExpose({
  showModal,
  closeModal
});
</script>
