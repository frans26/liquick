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
      <h3 class="mt-24 text-3xl font-semibold text-gray-900 capitalize">
        {{ sheet?.name }}
      </h3>

      <h4 class="mt-2 text-lg leading-6 text-gray-900">
        {{ sheet?.description }}
      </h4>

      <div class="mt-4 border rounded-md shadow-sm p-4 bg-white">
        <h5 class="text-xl font-semibold text-gray-900 capitalize">Summary</h5>

        <div class="my-2 border-t border-gray-200"></div>

        <h6 class="text-lg font-medium">amount to pay</h6>

        <p class="mt-2 text-sm" v-for="participant in sheet?.participants" :key="participant.id">
          <span class="font-medium">{{ participant.name }}:</span> {{ contributionStore.amountToPay(sheetId,
            participant.id) }}
        </p>

        <div class="my-2 border-t border-gray-200"></div>

        <p class="text-sm">
          <span class="font-medium">total:</span> {{ contributionStore.totalAmount(sheetId) }}
        </p>
      </div>

      <div class="mt-6">
        <div v-for="item in sheetItems" :key="item.id" class="mb-4 border rounded-md shadow-sm p-4 bg-white">
          <h5 class="text-xl font-semibold text-gray-900 capitalize">{{ item.name }}</h5>
          <p class="text-gray-800">{{ item.description }}</p>

          <div class="my-2 border-t border-gray-200"></div>

          <p class="text-sm">
            <span class="font-medium">amount:</span> {{ item.amount }}
          </p>

          <p class="text-sm">
            <span class="font-medium">paid by:</span> {{ item.paidBy.name }}
          </p>

          <p class="text-sm">
            <span class="font-medium">contributors:</span> {{ item.contributors.map(c => c.name) }}
          </p>

          <p class="text-sm">
            <span class="font-medium">amount per contributor:</span> {{ item.amountPerContributor.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useSheetStore } from '@/stores/sheet-store'
import { useItemStore } from '@/stores/items-store'
import { useContributionStore } from '@/stores/contributions-store'

const route = useRoute()
const router = useRouter()
const sheetStore = useSheetStore()
const itemStore = useItemStore()
const contributionStore = useContributionStore()

const sheetId = computed(() => route.params.id as string)

const sheet = computed(() => {
  return sheetStore.getSheet(sheetId.value)
})

const sheetItems = computed(() => {
  return itemStore.getSheetItems(sheetId.value)
})

function addItem() {
  router.push(`/sheet/${route.params.id}/add-item`)
}
</script>

<style scoped></style>
