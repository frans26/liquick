<template>
  <div class="mb-4 border rounded-md shadow-sm p-4 cursor-pointer bg-white">
    <div>
      <h5 class="text-lg text-gray-900 font-semibold">
        {{ name }}
      </h5>
    </div>

    <div>
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description?: string
}>()
</script>

<style scoped></style>
