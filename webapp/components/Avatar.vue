<template>
  <div class="p-3 flex items-center md:border-b-2 md:border-gray-300">
    <img :src="user?.avatarUrl" class="h-20 w-20 rounded-full border-2 border-gray-300">
    <div class="ml-3 w-36 break-words">{{ user?.email }}</div>
  </div>
</template>
<script setup lang="ts">

const { user } = await useAuth();

const username = computed(() => {
  return user.value?.email.split("@")[0];
});

</script>
