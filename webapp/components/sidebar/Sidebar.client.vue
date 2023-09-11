<template>
  <aside
    class="fixed flex h-screen flex-col overflow-hidden border-2 border-gray-300 bg-slate-50 duration-500 ease-out"
    :class="{
      'w-20': isMobile && !isOpen,
      'w-80': (isMobile && isOpen) || isDesktop,
      relative: isDesktop
    }">
    <Icon
      :name="isOpen ? 'mdi:arrow-left' : 'mdi:menu'"
      size="32"
      :visibility="isMobile ? 'visible' : 'hidden'"
      class="z-50 justify-end"
      :class="{
        'absolute left-5 cursor-pointer lg:left-6': !isOpen,
        'absolute right-1 duration-200 ease-out hover:-translate-x-1 hover:cursor-pointer':
          isOpen
      }"
      @click="toggle" />
    <SidebarUser :is-expanded="isOpen" />
    <SidebarApplicationList :is-expanded="isOpen" />
  </aside>
</template>

<script setup>
const { isMobile, isDesktop } = useBreakpoint();
const { isOpen, toggle } = useSidebarMenu();
</script>
