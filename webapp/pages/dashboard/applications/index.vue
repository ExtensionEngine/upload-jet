<template>
  <div class="flex flex-col pb-2">
    <div class="mb-4 flex w-full flex-row justify-end p-4 pb-0">
      <button
        @click="showCreateApplicationModal = true"
        class="w-32 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
        Create App
      </button>
    </div>

    <div class="max-h-[90vh] overflow-y-auto p-4 pb-8 pt-10">
      <li
        class="mb-6 flex h-14 list-none items-center justify-between rounded-lg border-2 bg-slate-50 pl-4 pr-2 duration-200 ease-out hover:translate-x-1 hover:cursor-pointer hover:border-cyan-500"
        v-for="app in mockedApplications"
        :key="app.id">
        <div class="font-semibold">{{ app.name }}</div>
        <p class="hover:text-red-600" @click="handleDeleteApplication(app.id)">
          Delete
        </p>
      </li>
    </div>
  </div>

  <Teleport to="body">
    <CreateApplicationModal
      :show="showCreateApplicationModal"
      @close="showCreateApplicationModal = false"
      @createApplication="handleCreateApplication"
      v-model:input-value="inputValue" />
    <DeleteApplicationModal
      :show="showDeleteApplicationModal"
      :id="appId"
      @close="showDeleteApplicationModal = false"
      @deleteApplication="deleteApplication(appId)" />
  </Teleport>
</template>

<script setup>
import CreateApplicationModal from './createApplicationModal/createApplicationModal.vue';
import DeleteApplicationModal from './deleteApplicationModal/deleteApplicationModal.vue';
const showCreateApplicationModal = ref(false);
const showDeleteApplicationModal = ref(false);
const appId = ref(null);
const inputValue = ref('');

function handleDeleteApplication(id) {
  showDeleteApplicationModal.value = true;
  appId.value = id;
}

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

const handleCreateApplication = inputValue => {
  const randomId = Math.floor(Math.random() * 1000);
  const newApplication = { id: randomId, name: inputValue };
  mockedApplications.value.push(newApplication);
};

const deleteApplication = id => {
  mockedApplications.value = mockedApplications.value.filter(
    app => app.id !== id
  );
};
</script>
