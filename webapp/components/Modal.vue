<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
    <div
      class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
      <Icon
        @click="emit('closeModal')"
        :name="'mdi:close'"
        size="24"
        class="absolute right-2 top-2 ease-out hover:cursor-pointer" />

      <slot></slot>

      <div class="flex justify-end gap-3">
        <button
          @click="emit('closeModal')"
          class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
          Cancel
        </button>
        <button
          @click="performAction"
          :disabled="disableActionButton"
          class="rounded-sm border-2 bg-red-400 p-2 text-white hover:bg-red-500"
          :class="actionButtonClass">
          {{ actionButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  actionButtonText: { type: String },
  disableActionButton: { type: Boolean },
  actionButtonClass: { type: String },
  performAction: { type: Function }
});

const emit = defineEmits(['closeModal']);
</script>
