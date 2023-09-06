<template>
  <Transition name="deleteApplicationlicationModal">
    <div
      v-if="show"
      class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-gray-700 bg-opacity-50 transition-opacity duration-100 ease-in-out">
      <div
        class="relative m-auto flex w-96 flex-col gap-7 rounded-xl bg-white p-5 pl-7 shadow-md">
        <Title title="Delete Application?" />

        <Description
          title="Are you sure you want to permanently delete this application?" />

        <div class="flex justify-end gap-3">
          <Button
            buttonStyle="bg-gray-300 text-black hover:bg-gray-400"
            title="Cancel"
            @click="emit('close')" />
          <Button
            buttonStyle="bg-red-400 text-white hover:bg-red-500"
            title="Delete"
            @click="deleteApplication" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from './Button.vue';
import Title from './Title.vue';
import Description from './Description.vue';

const props = defineProps({
  show: { type: Boolean },
  id: { type: Number }
});
const emit = defineEmits(['close', 'deleteApplication']);
const deleteApplication = () => {
  emit('deleteApplication', props.id);
  emit('close');
};
</script>
