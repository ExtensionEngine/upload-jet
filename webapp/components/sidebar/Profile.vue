<template>
  <div class="h-36 border-b-2 border-gray-300 p-2">
    <div
      class="relative flex h-full justify-center"
      :class="{ hidden: !isExpanded }">
      <div class="flex items-center space-x-4">
        <div
          class="h-16 w-16 overflow-hidden rounded-full bg-gray-300 object-cover"></div>
        <p>Username</p>
      </div>
      <p class="absolute bottom-0 right-0">Signout</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean, required: true }
});
</script>

<style scoped></style>
