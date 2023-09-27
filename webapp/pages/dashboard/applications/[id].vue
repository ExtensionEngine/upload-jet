<template>
  <div class="p-4" v-if="application">
    <h1 class="text-3xl">{{ createdAt }}</h1>
    <div class="mt-3">
      <div class="flex text-xl">
        <label class="mr-2">Name:</label>
        <div>{{ application.name }}</div>
      </div>
      <div class="flex text-xl">
        <label class="mr-2">Created:</label>
        <div>{{ createdAt }}</div>
      </div>
    </div>
    <div class="mt-3">
      <div class="text-3xl mb-2 mr-2">Api Key</div>
      <div class="flex">
        <input type="text" class="border-gray border-2 rounded-md p-1 w-96 text-center mr-3"
          :placeholder="apiKeyPlacehoder" :value="apiKey" disabled>
        <button v-if="!hasApiKey" @click.prevent="openDeleteApiKeyModal()"
          class="rounded-lg bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-600">
          Generate API key
        </button>
        <button v-if="hasApiKey" @click.prevent="openDeleteApiKeyModal()"
          class="rounded-lg bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-600">
          Delete API key
        </button>
      </div>

    </div>
  </div>

  <DeleteApiKeyModal ref="deleteApiKeyModal" @delete:api-key="deleteApiKey()" />
</template>

<script setup lang="ts">
import { Application } from '@/types/application';

definePageMeta({
  name: 'Application details',
  layout: 'dashboard-layout',
  middleware: ['auth']
});

const apiKey = ref<string>();

const deleteApiKeyModal = ref();
const { showModal: showDeleteModal, closeModal: closeDeleteModal } = useModal(
  deleteApiKeyModal
);

const formatDate = (dateString: string | undefined): string => {
  return dateString ? new Date(dateString).toUTCString() : '';
}

const { data: application, error, refresh: refreshApp } = await useApiFetch<Application>(
  `applications/${useRoute().params.id}`
);

if (error.value) {
  throw createError({ ...error.value, fatal: true });
}

const createdAt = computed(() => {
  return formatDate(application.value?.createdAt);
});

const apiKeyPlacehoder = computed(() => {
  return application.value?.hasApiKey ?
    '********-****-****-****-************' :
    'Api key does not exist';
});

const hasApiKey = computed(() => {
  return application.value?.hasApiKey;
});

function openDeleteApiKeyModal() {
  showDeleteModal();
}

const deleteApiKey = async () => {
  closeDeleteModal();

  const { error } = await useApiFetch(
    `applications/${useRoute().params.id}/api-keys`
    , { method: 'DELETE' });

  console.log("$$$$$$$$", error)
};

</script>
