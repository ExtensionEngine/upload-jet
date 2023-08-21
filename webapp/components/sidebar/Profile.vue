<template>
  <div class="h-36 border-b-2 border-gray-300 p-4">
    <div
      :class="{ hidden: isExpanded }"
      class="relative flex h-full items-end justify-center">
      <div
        class="h-10 w-10 overflow-hidden rounded-full bg-gray-300 object-cover" />
    </div>

    <div
      class="relative flex h-full justify-start"
      :class="{ hidden: !isExpanded }">
      <div class="flex items-center space-x-8">
        <div
          class="h-20 w-20 overflow-hidden rounded-full bg-gray-300 object-cover" />
        <p>Username</p>
      </div>
      <NuxtLink :to="`/login`">
        <p
          class="absolute bottom-0 right-0 text-sm text-gray-400 hover:cursor-pointer hover:underline">
          Signout
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean, required: true }
});
</script>
