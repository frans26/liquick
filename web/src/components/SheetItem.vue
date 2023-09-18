<template>
  <div class="mb-4 border rounded-md shadow-sm p-4 cursor-pointer bg-white">
    <h5 class="text-lg text-gray-900 font-semibold">
      {{ name }}
    </h5>

    <p class=" text-sm leading-6 text-gray-700" :class="{ 'mt-2': description }">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description?: string
}>()
</script>

<style scoped></style>
