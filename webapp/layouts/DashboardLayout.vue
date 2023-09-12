<script setup lang="ts">
const { isOpen, close, toggle } = useSidebarMenu();
</script>

<template>
  <Header
    @toggle-sidebar="toggle"
    :is-open="isOpen"
    class="absolute lg:hidden lg:h-16" />
  <div class="flex">
    <Sidebar @close="close" :is-open="isOpen" />
    <main class="h-screen w-screen pt-12 lg:flex-1 lg:pt-0">
      <slot></slot>
    </main>
  </div>
</template>
