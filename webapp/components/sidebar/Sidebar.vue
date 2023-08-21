<template>
  <aside
    class="transition-width fixed flex h-screen w-12 flex-col overflow-hidden border-2 border-blue-400 bg-slate-200 p-1 duration-500 ease-out lg:relative"
    :class="{
      'w-12': !isExpanded,
      'lg:w-64': isExpanded,
      'is-expanded': isExpanded
    }">
    <i
      class="i-mdi-arrow-right absolute right-0 z-50 h-8 w-8 justify-end duration-200 ease-out hover:translate-x-1"
      :class="{ hidden: isExpanded }"
      @click="toggleIsExpanded" />
    <i
      class="i-mdi-arrow-left absolute right-0 z-50 h-8 w-8 justify-end duration-200 ease-out hover:translate-x-1"
      :class="{ hidden: !isExpanded }"
      @click="toggleIsExpanded" />
    <SidebarProfile />
    <SidebarApplicationList :isExpanded="isExpanded" />
  </aside>
</template>

<script setup>
const isExpanded = ref(true);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style>
.is-expanded {
  width: 16rem;
}
</style>
