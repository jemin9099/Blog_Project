<script setup lang="ts">
const props = defineProps(['label', 'type', 'placeholder' , 'modelValue' , 'isError'])
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        :value="modelValue"
        @input="handleInput($event )"
        class="w-full rounded-lg border   bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
        :class="isError?'border-red-500':'border-stroke'"
      />

      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
    <div v-if="isError" class="text-red-500">{{isError}}</div>
  </div>
</template>
