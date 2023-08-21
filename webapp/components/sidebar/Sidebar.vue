<template>
  <aside
    class="transition-width fixed flex h-screen flex-col overflow-hidden border-2 border-gray-300 bg-slate-200 duration-500 ease-out lg:relative"
    :class="isExpanded ? 'w-80 lg:w-80' : 'w-20'">
    <i
      class="i-mdi-arrow-right absolute right-1 z-50 h-8 w-8 justify-end duration-200 ease-out hover:translate-x-1"
      :class="{ hidden: isExpanded }"
      @click="toggleIsExpanded" />
    <i
      class="i-mdi-arrow-left absolute right-1 z-50 h-8 w-8 justify-end duration-200 ease-out hover:-translate-x-1"
      :class="{ hidden: !isExpanded }"
      @click="toggleIsExpanded" />
    <SidebarProfile :isExpanded="isExpanded" />
    <SidebarApplicationList :isExpanded="isExpanded" />
  </aside>
</template>

<script setup>
const isExpanded = ref(false);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>
