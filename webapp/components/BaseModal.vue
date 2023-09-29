<template>
  <dialog ref="baseModalRef">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 bg-white p-5 pl-7 shadow-md">
      <Icon
        @click="closeModal"
        :name="'mdi:close'"
        size="24"
        class="absolute right-2 top-2 ease-out hover:cursor-pointer" />
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
const emit = defineEmits<{
  close: [];
}>();

const showModal = () => {
  baseModalRef.value?.showModal();
};

const closeModal = () => {
  baseModalRef.value?.close();
  emit('close');
};

defineExpose({
  showModal,
  closeModal
});
</script>
