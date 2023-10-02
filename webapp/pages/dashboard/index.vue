<template>
  <div class="flex h-screen flex-col pb-2">
    <div class="mb-4 flex w-full flex-row justify-end p-4 pb-0">
      <button
        @click="showCreateModal"
        class="w-32 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Create App
      </button>
    </div>

    <div class="overflow-y-scroll p-4 pb-8 pt-10">
      <NuxtLink
        :to="`/dashboard/applications/${application.id}`"
        class="mb-6 flex h-14 list-none items-center justify-between rounded-lg border-2 bg-slate-50 pl-4 pr-2 duration-200 ease-out hover:cursor-pointer hover:border-slate-400"
        v-for="application in applicationList"
        :key="application.id">
        <div class="font-semibold">
          {{ application.name }}
        </div>
        <button
          @click.prevent="openDeleteApplicationModal(application.id)"
          class="hover:text-red-600">
          Delete
        </button>
      </NuxtLink>
    </div>
  </div>

  <CreateApplicationModal
    ref="createApplicationModal"
    @create:application="createApplication"
    v-model:application-name="inputValue"
    :errorMessage="errorMessage"
    @close="resetValues" />
  <DeleteApplicationModal
    ref="deleteApplicationModal"
    @delete:application="deleteApplication(applicationId)"
    :id="applicationId"
    :application-name="applicationName"
    :errorMessage="errorMessage"
    @close="resetValues" />
</template>

<script setup lang="ts">
import { Application } from 'types/application';

definePageMeta({
  layout: 'dashboard-layout',
  name: 'Applications',
  alias: '/dashboard/applications',
  middleware: ['auth']
});

const { $apiFetch } = useNuxtApp();
const { data: applicationList } =
  await useApiFetch<Application[]>('applications');
const applicationId = ref<number>();
const inputValue = ref('');
const createApplicationModal = ref();
const deleteApplicationModal = ref();
const errorMessage = ref('');

const { showModal: showCreateModal, closeModal: closeCreateModal } = useModal(
  createApplicationModal
);
const { showModal: showDeleteModal, closeModal: closeDeleteModal } = useModal(
  deleteApplicationModal
);

const createApplication = async (name: string) => {
  return $apiFetch<Application>('/applications', {
    method: 'POST',
    body: { name }
  })
    .then(data => {
      applicationList.value?.push(data);
      closeCreateModal();
    })
    .catch(error => {
      errorMessage.value = error.response._data.message;
    });
};

const deleteApplication = async (id: number | undefined) => {
  return $apiFetch<Application>(`/applications/${id}`, {
    method: 'DELETE'
  })
    .then(data => {
      applicationList.value =
        applicationList.value?.filter(app => app.id !== data?.id) ?? null;
      closeDeleteModal();
    })
    .catch(error => {
      errorMessage.value = error.response._data.message;
    });
};

function openDeleteApplicationModal(id: number) {
  applicationId.value = id;
  showDeleteModal();
}

const applicationName = computed(() => {
  const filteredApplication = applicationList.value?.find(
    app => app.id === applicationId.value
  );
  return filteredApplication?.name;
});

const resetValues = () => {
  inputValue.value = '';
  errorMessage.value = '';
};
</script>
