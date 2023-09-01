<script setup>
const props = defineProps({
  show: { type: Boolean }
});
const emit = defineEmits(['close']);
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 opacity-50 transition-opacity duration-100 ease-in-out">
      <div class="m-auto w-80 border-r-2 bg-white p-5 pl-7 shadow-md">
        <div class="modal-footer">
          <slot name="button">
            <button class="float-right" @click="emit('close')">Create</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
