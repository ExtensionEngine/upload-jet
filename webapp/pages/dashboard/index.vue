<template>
  <div class="flex flex-col pb-2">
    <div class="mb-4 flex w-full flex-row justify-end p-4 pb-0">
      <button
        @click="isCreateApplicationModalOpen = true"
        class="w-32 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Create App
      </button>
    </div>

    <div class="max-h-[90vh] overflow-y-auto p-4 pb-8 pt-10">
      <NuxtLink
        :to="`/dashboard/applications/${application.id}`"
        class="mb-6 flex h-14 list-none items-center justify-between rounded-lg border-2 bg-slate-50 pl-4 pr-2 duration-200 ease-out hover:cursor-pointer hover:border-slate-400"
        v-for="application in mockedApplications"
        :key="application.id">
        <div class="font-semibold">
          {{ application.name }}
        </div>
        <button
          class="hover:text-red-600"
          @click.prevent="openDeleteApplicationModal(application.id)">
          Delete
        </button>
      </NuxtLink>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="#teleported">
      <CreateApplicationModal
        v-if="isCreateApplicationModalOpen"
        @close:modal="isCreateApplicationModalOpen = false"
        @create:application="createApplication"
        v-model:application-name="inputValue" />
      <DeleteApplicationModal
        v-if="isDeleteApplicationModalOpen"
        @close:modal="isDeleteApplicationModalOpen = false"
        @delete:application="deleteApplication(applicationId)"
        :id="applicationId"
        :application-name="applicationName" />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  alias: '/dashboard/applications'
});

const isCreateApplicationModalOpen = ref(false);
const isDeleteApplicationModalOpen = ref(false);
const applicationId = ref<number>();
const inputValue = ref('');

function openDeleteApplicationModal(id: number) {
  isDeleteApplicationModalOpen.value = true;
  applicationId.value = id;
}

const applicationName = computed(() => {
  const filteredApplication = mockedApplications.value.find(
    app => app.id === applicationId.value
  );
  return filteredApplication?.name || null;
});

// Below is a test code just for the client side to showcase the render functionality, will be deleted before merging
// TODO:
// 1. Should retrieve a list of apps from the database that will be rendered on the client side
// 2. When user creates an app it should send a post request to authorized route and add it to dabatabase and retrieve a new list of apps to render
// 3. When user deletes an app it should send a post request to authorized route and delete it from the dabatabase and retrieve a new list of apps to render

const mockedApplications = ref([
  { id: 1, name: 'Mocked App 1' },
  { id: 2, name: 'Mocked App 2' },
  { id: 3, name: 'Mocked App 3' }
]);

const createApplication = (input: string) => {
  const randomId = Math.floor(Math.random() * 1000);
  const newApplication = { id: randomId, name: input };
  mockedApplications.value.push(newApplication);
  isCreateApplicationModalOpen.value = false;
  inputValue.value = '';
};

const deleteApplication = (id: number | undefined) => {
  mockedApplications.value = mockedApplications.value.filter(
    app => app.id !== id
  );
  isDeleteApplicationModalOpen.value = false;
};
</script>
