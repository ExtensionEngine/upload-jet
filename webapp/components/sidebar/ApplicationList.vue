<template>
  <div class="mt-4 flex flex-grow flex-col">
    <SidebarListItem
      icon-name="mdi:application-brackets"
      label="Applications"
      :hidden="!isExpanded" />
    <SidebarListItem
      icon-name="mdi:chart-areaspline"
      label="Usage"
      :hidden="!isExpanded" />
    <SidebarListItem
      icon-name="mdi:cash-usd"
      label="Billings"
      :hidden="!isExpanded" />
  </div>
</template>

<script setup>
const props = defineProps({
  isExpanded: { type: Boolean }
});
</script>
