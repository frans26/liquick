<template>
  <main class="w-full min-h-screen flex justify-center bg-stone-100">
    <div class="w-full px-6 fixed pt-6 pb-4 bg-white shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">LiQuick</h1>

        <button
          class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          @click="() => router.push('/add-sheet')">
          Add sheet
        </button>
      </div>
    </div>

    <div class="w-full max-w-md px-4">
      <div class="mt-24">
        <SheetItem v-for="sheet in sheetStore.sheets" :key="sheet.id" :name="sheet.name" :description="sheet.description"
          @view="router.push(`/sheet/${sheet.id}`)" @delete="null" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useSheetStore } from '@/stores/sheet-store'

import SheetItem from '@/components/SheetItem.vue'

const router = useRouter()
const sheetStore = useSheetStore()
</script>

<style scoped></style>
