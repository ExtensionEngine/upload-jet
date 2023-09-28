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
    v-model:application-name="inputValue" />
  <DeleteApplicationModal
    ref="deleteApplicationModal"
    @delete:application="deleteApplication(applicationId)"
    :id="applicationId"
    :application-name="applicationName" />
</template>

<script setup lang="ts">
import { Application } from 'types/application';

definePageMeta({
  layout: 'dashboard-layout',
  name: 'Applications',
  alias: '/dashboard/applications',
  middleware: ['auth']
});

const { data: applicationList } =
  await useApiFetch<Application[]>('applications');

const createApplicationModal = ref();
const deleteApplicationModal = ref();

const { showModal: showCreateModal, closeModal: closeCreateModal } = useModal(
  createApplicationModal
);
const { showModal: showDeleteModal, closeModal: closeDeleteModal } = useModal(
  deleteApplicationModal
);

const applicationId = ref<number>();
const inputValue = ref('');

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

const createApplication = async (name: string) => {
  const { data } = await useApiFetch('/applications', {
    method: 'POST',
    body: { name }
  });
  const { data: refreshedApplicationList } =
    await useApiFetch<Application[]>('/applications');
  applicationList.value = refreshedApplicationList.value;
  closeCreateModal();
};

const deleteApplication = async (id: number | undefined) => {
  const { data } = await useApiFetch(`/applications/${id}`, {
    method: 'DELETE'
  });
  const { data: refreshedApplicationList } =
    await useApiFetch<Application[]>('/applications');
  applicationList.value = refreshedApplicationList.value;
  closeDeleteModal();
};
</script>
