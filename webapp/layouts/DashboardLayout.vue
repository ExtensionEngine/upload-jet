<script setup lang="ts">
const { isOpen, close, toggle } = useSidebarMenu();
</script>

<template>
  <Header
    @toggle-sidebar="toggle"
    :is-open="isOpen"
    class="fixed top-0 md:hidden md:h-16" />
  <div class="flex">
    <Sidebar @close="close" :is-open="isOpen" />
    <main class="h-screen w-screen pt-12 md:flex-1 md:pt-0">
      <slot></slot>
    </main>
  </div>
</template>
