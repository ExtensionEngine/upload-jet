<template>
  <h1>Application</h1>
  <div>
    <div>{{ application?.id }}</div>
    <div>{{ application?.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute();

interface Application {
  id: number;
  name: string;
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

const applicationId = parseInt(route.params.id.toString());
if (!isNaN(applicationId)) {
  fetchApplication(applicationId);
}
</script>