<template>
  <div class="mb-4 border rounded-md shadow-sm p-4 cursor-pointer bg-white flex items-center divide-x"
    @click="emit('view')">
    <div class="flex-1">
      <h5 class="text-lg text-gray-900 font-semibold">
        {{ name }}
      </h5>

      <p class=" text-sm leading-6 text-gray-700" :class="{ 'mt-2': description }">{{ description }}</p>
    </div>

    <div class="pl-4">
      <button class="w-9 rounded-md bg-transparent px-2 py-1 font-semibold text-rose-600 hover:text-rose-500"
        @click.stop="emit('delete')">
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'

defineProps<{
  name: string
  description?: string
}>()

const emit = defineEmits<{
  (event: 'view'): void
  (event: 'delete'): void
}>()
</script>

<style scoped></style>
