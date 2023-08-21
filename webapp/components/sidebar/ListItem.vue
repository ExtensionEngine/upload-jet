<template>
  <div class="mb-4 duration-200 ease-out hover:bg-slate-300">
    <NuxtLink
      :to="`/dashboard/${label}`"
      class="flex h-10 cursor-pointer items-center gap-4 pl-6">
      <i :class="iconClass"></i>
      <p :class="{ hidden: !isExpanded }">{{ label }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  iconClass: { type: String, required: true },
  label: { type: String, required: true },
  isExpanded: { type: Boolean, required: true }
});
</script>
