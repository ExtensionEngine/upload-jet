<template>
  <div class="flex h-screen flex-row">
    <div
      class="transition-width w-0 overflow-hidden border-2 border-blue-400 bg-slate-200 duration-500 ease-out lg:w-64">
      <slot name="sidebar" />
    </div>
    <div class="flex-1 border-2 border-red-400 bg-slate-200">
      <slot name="maincontent" />
    </div>
  </div>
</template>

<style scoped></style>

<script setup></script>
