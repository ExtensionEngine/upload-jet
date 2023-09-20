<template>
  <div class="m-4">
    <div class="flex justify-between mb-4">
      <h1 class="text-3xl">{{ application?.name }}</h1>
      <button class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Generate API key
      </button>
    </div>

    <div>
      <div class="flex text-xl">
        <label class="mr-2">Name:</label>
        <div>{{ application?.name }}</div>
      </div>
      <div class="flex text-xl">
        <label class="mr-2">Created:</label>
        <div>{{ application?.createdAt }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Application } from '@/types/application.dto';
const route = useRoute();
const config = useRuntimeConfig();
const headers = useRequestHeaders();
const applicationUrl = new URL(`/applications/${route.params.id}`, config.public.apiUrl);

const application = ref<Application | null>(null);

const formatDate = (dateString: string) => {
  return new Date(dateString).toUTCString()
}

const { data, error } = await useFetch(applicationUrl.href, { headers, credentials: 'include' });
const app = data.value as Application;

if (error.value) {
  throw createError({ ...error.value, fatal: true });
}

app.createdAt = formatDate(app.createdAt);
application.value = app;

</script>
