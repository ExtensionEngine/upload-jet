<template>
  <div class="m-4">
    <div class="flex justify-between mb-4">
      <h1 class="text-3xl">Application details</h1>
      <button class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Generate API key
      </button>
    </div>

    <div v-if="application">
      <div class="flex text-xl">
        <label class="mr-2">Name:</label>
        <div>{{ application.name }}</div>
      </div>
      <div class="flex text-xl">
        <label class="mr-2">Created:</label>
        <div>{{ formatDate(application.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute();

interface Application {
  id: number;
  name: string;
  createdAt: string;
}

const application = ref<Application | null>(null);

const fetchApplication = async (id: number) => {
  const config = useRuntimeConfig();

  const route = `/application/${id}`;
  const applicationUrl = new URL(route, config.public.apiUrl);

  $fetch(applicationUrl.href).then(data => {
    application.value = data as Application;
  })
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toUTCString()
}

const applicationId = parseInt(route.params.id.toString());
if (!isNaN(applicationId)) {
  fetchApplication(applicationId);
}
</script>
