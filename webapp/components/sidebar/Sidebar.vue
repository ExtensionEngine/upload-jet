<template>
  <aside
    class="fixed z-40 flex h-screen flex-col overflow-hidden border-2 border-gray-300 bg-slate-50 duration-500 ease-out"
    :class="{
      'w-20': isMobile && !isExpanded,
      'w-80': (isMobile && isExpanded) || isDesktop,
      relative: isDesktop
    }">
    <Icon
      :name="isExpanded ? 'mdi:arrow-left' : 'mdi:menu'"
      size="32"
      :visibility="isMobile ? 'visible' : 'hidden'"
      class="z-50 justify-end"
      :class="{
        'absolute left-5 cursor-pointer lg:left-6': !isExpanded,
        'absolute right-1 duration-200 ease-out hover:-translate-x-1 hover:cursor-pointer':
          isExpanded
      }"
      @click="toggleIsExpanded" />

    <SidebarUser :is-expanded="isExpanded" />
    <SidebarApplicationList :is-expanded="isExpanded" />
  </aside>
</template>

<script setup>
const props = defineProps({
  isDesktop: { type: Boolean },
  isMobile: { type: Boolean }
});

const isExpanded = ref(props.isDesktop);

function toggleIsExpanded() {
  isExpanded.value = !isExpanded.value;
}

watch(
  () => props.isDesktop,
  newIsDesktop => {
    isExpanded.value = newIsDesktop;
  }
);
</script>
