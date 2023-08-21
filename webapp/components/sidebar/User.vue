<template>
  <div class="h-36 border-b-2 border-gray-300 p-4">
    <div
      :class="{ hidden: isExpanded }"
      class="relative flex h-full items-end justify-center">
      <SidebarProfilePhoto :isExpanded="isExpanded" />
    </div>

    <div
      class="relative flex h-full justify-start"
      :class="{ hidden: !isExpanded }">
      <div class="flex items-center space-x-6">
        <SidebarProfilePhoto :isExpanded="isExpanded" />
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
  isExpanded: { type: Boolean, default: false }
});
</script>
