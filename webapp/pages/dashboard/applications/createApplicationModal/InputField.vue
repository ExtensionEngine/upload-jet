<template>
  <input
    :type="props.type"
    :id="props.name"
    :name="props.name"
    :placeholder="props.placeholder"
    v-model="computedValue"
    class="h-10 w-full border-2 p-2" />
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String },
  name: { type: String },
  modelValue: { type: String }
});
const emit = defineEmits(['update:modelValue']);

const computedValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});
</script>
