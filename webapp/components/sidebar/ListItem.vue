<template>
  <div class="mb-4 duration-200 ease-out hover:bg-slate-300">
    <NuxtLink
      :to="`/dashboard/${label.toLowerCase()}`"
      class="flex h-10 cursor-pointer items-center gap-8 pl-6">
      <Icon :name="iconName" size="24" />
      <p :class="{ hidden: !isExpanded }">{{ label }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  iconName: { type: String },
  label: { type: String },
  isExpanded: { type: Boolean }
});
</script>

<style>
.router-link-active {
  @apply border-r-4 border-gray-800 bg-gray-300;
}
</style>
