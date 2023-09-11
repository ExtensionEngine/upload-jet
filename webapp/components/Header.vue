<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
import User from './sidebar/User.vue';
</script>

<template>
  <header class="fixed z-50 w-full bg-white shadow-md lg:h-16">
    <Container class="flex h-full items-center justify-between px-4">
      <Button @toggle-sidebar="$emit('toggle-sidebar')" :is-open="isOpen" />
      <ListItem />
      <User />
    </Container>
  </header>
</template>
