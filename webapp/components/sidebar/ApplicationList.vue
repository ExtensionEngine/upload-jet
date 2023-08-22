<template>
  <div class="mt-4 flex flex-grow flex-col">
    <SidebarListItem
      icon-class="i-mdi-application-brackets h-6 w-6"
      label="Applications"
      :is-expanded="isExpanded" />
    <SidebarListItem
      icon-class="i-mdi-chart-areaspline h-6 w-6"
      label="Usage"
      :is-expanded="isExpanded" />
    <SidebarListItem
      icon-class="i-mdi-cash-usd h-6 w-6"
      label="Billings"
      :is-expanded="isExpanded" />
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean }
});
</script>
