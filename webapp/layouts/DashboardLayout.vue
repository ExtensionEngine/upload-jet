<script setup lang="ts">
const { isOpen, close, toggle } = useSidebarMenu();
</script>

<template>
  <div>
    <Header @toggle-sidebar="toggle" :is-open="isOpen" />
    <Sidebar @close="close" :is-open="isOpen" />
    <main class="pt-20">
      <slot></slot>
    </main>
  </div>
</template>
