<template>
  <div
    class="relative h-36 border-b-2 border-gray-300"
    :class="{
      'flex items-center justify-center pb-8': isExpanded,
      'pb-10 pl-4': !isExpanded
    }">
    <div class="relative flex h-full items-end">
      <div class="flex items-center space-x-10">
        <SidebarProfilePhoto :is-expanded="isExpanded" />
        <p :class="{ hidden: !isExpanded }">Username</p>
      </div>
    </div>
    <NuxtLink :to="`/`">
      <p
        class="absolute bottom-2 right-2 text-sm text-gray-400 hover:cursor-pointer hover:underline"
        :class="{ hidden: !isExpanded }">
        Signout
      </p>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean }
});
</script>
