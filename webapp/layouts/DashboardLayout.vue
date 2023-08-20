<template>
  <div class="grid h-screen grid-cols-5 bg-slate-200">
    <div class="col-span-1 hidden border-2 border-red-400 lg:block">
      <slot name="sidebar" />
    </div>
    <div class="col-span-5 border-2 border-red-400 lg:col-span-4">
      <slot name="maincontent" />
    </div>
  </div>
</template>

<style scoped></style>

<script setup></script>
