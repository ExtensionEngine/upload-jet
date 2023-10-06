<template>
  <div
    class="flex w-auto items-center justify-between gap-4 p-3 md:border-b-2 md:border-gray-300">
    <img
      :src="user?.avatarUrl"
      class="h-10 w-10 rounded-full border-2 border-gray-300 md:h-14 md:w-14" />
    <div class="break-words text-sm md:text-base">{{ user?.email }}</div>
  </div>
</template>
<script setup lang="ts">
const { user } = await useAuth();
</script>
