<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    type="text"
    v-bind="$attrs"
    p="x-4 y-2"
    w="60vw"
    text="center"
    bg="transparent"
    border="~ rounded gray-700 dark:gray-300"
    outline="none active:none"
  >
</template>
