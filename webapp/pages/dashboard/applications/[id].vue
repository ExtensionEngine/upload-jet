<template>
  <div class="p-4" v-if="application">
    <h1 class="text-3xl">{{ application.name }}</h1>
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
      <h2 class="text-2xl mb-2 mr-2">Api Key</h2>
      <div class="flex">
        <input type="text" class="border-gray border-2 rounded-md p-1 w-96 text-center mr-3"
          :placeholder="apiKeyPlacehoder" :value="apiKey" disabled>
        <button v-if="!hasApiKey" @click="showCreateModal()"
          class="rounded-lg bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-600">
          Create API key
        </button>
        <button v-else @click="showDeleteModal()"
          class="rounded-lg bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-600">
          Delete API key
        </button>
      </div>

    </div>
  </div>

  <DeleteApiKeyModal ref="deleteApiKeyModal" @delete:api-key="deleteApiKey" />
  <CreateApiKeyModal ref="createApiKeyModal" @create:api-key="createApiKey" />
</template>

<script setup lang="ts">
import { Application } from '@/types/application';
import DeleteApiKeyModal from '@/components/api-key/DeleteApiKeyModal.vue';
import CreateApiKeyModal from '@/components/api-key/CreateApiKeyModal.vue';

const { $apiFetch } = useNuxtApp();

definePageMeta({
  name: 'Application details',
  layout: 'dashboard-layout',
  middleware: ['auth']
});

const apiKey = ref('');

const deleteApiKeyModal = ref();
const { showModal: showDeleteModal, closeModal: closeDeleteModal } = useModal(
  deleteApiKeyModal
);
const createApiKeyModal = ref();
const { showModal: showCreateModal, closeModal: closeCreateModal } = useModal(
  createApiKeyModal
);

const formatDate = (dateString: string | undefined): string => {
  return dateString ? new Date(dateString).toUTCString() : '';
};

const { data: application, error } = await useApiFetch<Application>(
  `applications/${useRoute().params.id}`
);

if (error.value) {
  throw createError({ ...error.value, fatal: true });
};

const createdAt = computed(() => {
  return formatDate(application.value?.createdAt);
});

const hasApiKey = computed(() => !!application.value?.hasApiKey);

const apiKeyPlacehoder = computed(() =>
  hasApiKey.value ?
    '********-****-****-****-************' :
    'Api key does not exist'
);

const deleteApiKey = async () => {
  $apiFetch(`applications/${useRoute().params.id}/api-keys`, { method: 'DELETE' })
    .then(() => {
      apiKey.value = '';
      application.value = {
        ...application.value,
        hasApiKey: false
      } as Application;
    }).finally(() => closeDeleteModal());
};

const createApiKey = async () => {
  $apiFetch(`applications/${useRoute().params.id}/api-keys`, { method: 'POST' })
    .then(data => {
      apiKey.value = data;
      application.value = {
        ...application.value,
        hasApiKey: true
      } as Application;
    }).finally(() => closeCreateModal());
};

</script>
