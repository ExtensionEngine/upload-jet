<script setup lang="ts">
import Button from './Button.vue';
import Container from './Container.vue';

defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['toggle-sidebar']);
</script>

<template>
  <header class="fixed z-50 w-full bg-white shadow-md lg:h-16">
    <Container class="flex h-full items-center justify-between px-4">
      <Button @toggle-sidebar="$emit('toggle-sidebar')" :is-open="isOpen" />
      <HeaderListItem />
      <Avatar />
    </Container>
  </header>
</template>
