<script setup lang="ts">
const { isOpen, close, toggle } = useSidebarMenu();
</script>

<template>
  <div id="teleported">
    <Header
      @toggle-sidebar="toggle"
      :is-open="isOpen"
      class="fixed top-0 md:hidden md:h-16" />
    <div class="flex">
      <Sidebar @close="close" :is-open="isOpen" />
      <div
        @click="close"
        v-show="isOpen"
        class="fixed inset-0 z-30 mt-12 bg-gray-900 bg-opacity-50"></div>
      <main class="h-screen w-screen pt-12 md:flex-1 md:pt-0">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
