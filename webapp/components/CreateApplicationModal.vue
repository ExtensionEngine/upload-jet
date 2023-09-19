<template>
  <BaseModal @close:modal="emit('close:modal')">
    <template v-slot:header>
      <h2 class="text-center text-xl uppercase">Create Application</h2>
    </template>
    <template v-slot:content>
      <form @submit.prevent>
        <input
          placeholder="Enter your Application name"
          type="text"
          v-model="applicationName"
          class="h-10 w-full border-2 p-2" />
      </form>
    </template>
    <template v-slot:footer>
      <button
        @click="emit('close:modal')"
        class="rounded-sm border-2 bg-gray-300 p-2 text-black hover:bg-gray-400">
        Cancel
      </button>
      <button
        @click="emit('create:application', applicationName)"
        :disabled="!applicationName"
        class="text-whit rounded-sm border-2 bg-gray-500 p-2"
        :class="{ 'bg-green-500 hover:bg-green-400': applicationName }">
        Create
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  applicationName: { type: String }
});

const emit = defineEmits([
  'close:modal',
  'update:applicationName',
  'create:application'
]);

const applicationName = computed({
  get() {
    return props.applicationName;
  },
  set(newValue) {
    emit('update:applicationName', newValue);
  }
});
</script>
