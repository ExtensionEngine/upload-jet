<template>
  <Icon
    name="mdi:menu"
    size="32"
    :visibility="isExpanded ? ' hidden' : 'visible'"
    class="absolute left-2 z-50 cursor-pointer justify-end lg:left-6"
    @click="toggleIsExpanded" />

  <aside
    class="fixed flex h-screen flex-col overflow-hidden border-gray-300 bg-slate-50 duration-500 ease-out lg:relative"
    :class="{
      'w-0 lg:w-20 lg:border-2': !isExpanded,
      'w-80 border-2 lg:w-80': isExpanded
    }">
    <Icon
      name="mdi:arrow-left"
      size="30"
      :visibility="isExpanded ? 'visible' : 'hidden'"
      class="absolute right-1 justify-end duration-200 ease-out hover:-translate-x-1 hover:cursor-pointer"
      @click="toggleIsExpanded" />

    <SidebarUser :isExpanded="isExpanded" />
    <SidebarApplicationList :isExpanded="isExpanded" />
  </aside>
</template>

<script setup>
const { isMobile } = useDevice();
const isExpanded = ref(!isMobile);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}
</script>
