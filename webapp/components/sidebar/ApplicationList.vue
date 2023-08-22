<template>
  <div class="mt-4 flex flex-grow flex-col">
    <SidebarListItem
      icon-name="mdi:application-brackets"
      label="Applications"
      :is-expanded="isExpanded" />
    <SidebarListItem
      icon-name="mdi:chart-areaspline"
      label="Usage"
      :is-expanded="isExpanded" />
    <SidebarListItem
      icon-name="mdi:cash-usd"
      label="Billings"
      :is-expanded="isExpanded" />
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean }
});
</script>
