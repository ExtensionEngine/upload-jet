<template>
  <aside
    class="transition-width fixed flex h-screen w-12 flex-col overflow-hidden border-2 border-blue-400 bg-slate-200 p-2 duration-500 ease-out lg:relative"
    :class="{
      'w-12': !isExpanded,
      'lg:w-64': isExpanded,
      'is-expanded': isExpanded
    }">
    <i
      class="i-lucide-menu absolute right-0 h-8 w-8 justify-end"
      @click="toggleIsExpanded" />
  </aside>
</template>

<script setup>
const isExpanded = ref(true);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style scoped>
.is-expanded {
  width: 16rem;
}
</style>
