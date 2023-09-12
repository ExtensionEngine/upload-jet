<script setup lang="ts">
const { isOpen, close, toggle } = useSidebarMenu();
</script>

<template>
  <Header
    @toggle-sidebar="toggle"
    :is-open="isOpen"
    class="absolute lg:hidden lg:h-16" />
  <div class="flex flex-row">
    <Sidebar @close="close" :is-open="isOpen" />
    <main
      class="h-screen w-screen border-4 border-cyan-400 bg-red-200 pt-12 lg:flex-1 lg:pt-0">
      <slot></slot>
    </main>
  </div>
</template>
