<template>
  <aside
    class="fixed flex h-screen flex-col overflow-hidden border-2 border-gray-300 bg-slate-50 duration-500 ease-out"
    :class="{
      'w-20': isMobile && !isExpanded,
      'w-80': (isMobile && isExpanded) || isDesktop,
      relative: isDesktop
    }">
    <Icon
      :name="isExpanded ? 'mdi:arrow-left' : 'mdi:menu'"
      size="32"
      :visibility="isMobile ? 'visible' : 'hidden'"
      :class="{
        'absolute left-5 z-50 cursor-pointer justify-end lg:left-6':
          !isExpanded,
        'absolute right-1 z-50 justify-end duration-200 ease-out hover:-translate-x-1 hover:cursor-pointer':
          isExpanded
      }"
      @click="toggleIsExpanded" />

    <SidebarUser :is-expanded="isExpanded" :is-mobile="isMobile" />
    <SidebarApplicationList :is-expanded="isExpanded" :is-mobile="isMobile" />
  </aside>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
const breakpoints = useBreakpoints(breakpointsTailwind, { ssr: false });
const isMobile = breakpoints.smallerOrEqual('lg');
const isDesktop = breakpoints.greaterOrEqual('lg');
const isExpanded = ref(isDesktop);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>
