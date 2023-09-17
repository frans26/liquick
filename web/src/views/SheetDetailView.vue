<template>
  <main class="w-full min-h-screen flex justify-center bg-neutral-100">
    <div class="w-full px-6 fixed pt-6 pb-4 bg-white shadow-sm">
      <div class="flex justify-between items-center">
        <button
          class="rounded-md bg-white border border-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-100"
          @click="() => router.back()">
          Back
        </button>

        <h4 class="text-center text-2xl font-semibold">Details</h4>

        <button
          class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          @click="addItem">
          Add item
        </button>
      </div>
    </div>

    <div class="w-full max-w-md px-6">
      <div class="mt-24">
        {{ sheet?.name }}
      </div>

      <div>
        {{ sheet?.description }}
      </div>

      <!-- item list -->
      <div v-for="item in sheetItems" :key="item.id">
        <div>name {{ item.name }}</div>
        <div>description {{ item.description }}</div>
        <div>amount {{ item.amount }}</div>
        <div>paidBy {{ item.paidBy }}</div>
        <div>contributors {{ item.contributors.map(c => c.name) }}</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useSheetStore } from '@/stores/sheet-store'

const route = useRoute()
const router = useRouter()
const sheetStore = useSheetStore()

const sheetId = computed(() => route.params.id as string)

const sheet = computed(() => {
  return sheetStore.getSheet(sheetId.value)
})

const sheetItems = computed(() => {
  return sheetStore.getSheetItems(sheetId.value)
})

function addItem() {
  router.push(`/sheet/${route.params.id}/add-item`)
}
</script>

<style scoped></style>
