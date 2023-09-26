<template>
  <div class="p-4" v-if="application">
    <div class="flex justify-between mb-4">
      <h1 class="text-3xl">{{ application.name }}</h1>
      <button class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Generate API key
      </button>
    </div>

    <div>
      <div class="flex text-xl">
        <label class="mr-2">Name:</label>
        <div>{{ application.name }}</div>
      </div>
      <div class="flex text-xl">
        <label class="mr-2">Created:</label>
        <div>{{ createdAt }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Application } from '@/types/application';

definePageMeta({
  name: 'Application details',
  layout: 'dashboard-layout',
  middleware: ['auth']
});

const formatDate = (dateString: string | undefined): string => {
  return dateString ? new Date(dateString).toUTCString() : '';
}

const { data, error } = await useApiFetch<Application>(`applications/${useRoute().params.id}`);
const application = data.value;

if (error.value) {
  throw createError({ ...error.value, fatal: true });
}

const createdAt = computed(() => {
  return formatDate(application?.createdAt);
});

</script>
