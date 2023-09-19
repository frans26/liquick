<template>
  <main class="w-full min-h-screen flex justify-center bg-neutral-100">
    <PageHeader>
      <template #left>
        <button
          class="rounded-md bg-white border border-blue-500 px-3 py-1 min-h-[36px] text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-100"
          @click="() => router.back()">
          <ChevronLeftIcon class="text-blue-500 h-5 w-5" />
        </button>
      </template>

      <span>Item</span>

      <template #right>
        <button
          class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          @click="addItem">
          Add item
        </button>
      </template>
    </PageHeader>

    <div class="w-full max-w-md mt-24 px-4">
      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>

        <div class="mt-1">
          <input type="text" name="name" id="name" v-model="formData.name.value"
            class="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>

        <div class="mt-2" v-if="formData.name.error">
          <p class="text-xs text-red-500">{{ formData.name.error }}</p>
        </div>
      </div>

      <div class="mt-4">
        <label for="desc" class="block text-sm font-medium leading-6 text-gray-900">Description</label>

        <div class="mt-1">
          <textarea type="text" name="desc" id="desc" rows="3" v-model="formData.description.value"
            class="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>

      <div class="mt-4">
        <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>

        <div class="mt-1">
          <input type="number" name="amount" id="amount" v-model="formData.amount.value"
            class="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>

        <div class="mt-2" v-if="formData.amount.error">
          <p class="text-xs text-red-500">{{ formData.amount.error }}</p>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">Paid By</label>

        <Listbox name="paidby" v-model="formData.paidBy.value">
          <div class="relative mt-1 z-20">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
              <span class="block truncate">{{ formData.paidBy.value?.name || 'Select' }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="participant in sheet?.participants"
                  :key="participant.name" :value="participant" as="template">
                  <li :class="[
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]">
                    <span :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]">{{ participant.name }}</span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <div class="mt-2" v-if="formData.paidBy.error">
          <p class="text-xs text-red-500">{{ formData.paidBy.error }}</p>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">Contributor/s</label>

        <Listbox name="contributors" v-model="formData.contributors.value" multiple horizontal>
          <div class="relative mt-1 z-10">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
              <span class="block truncate">Select</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="participant in sheet?.participants"
                  :key="participant.name" :value="participant" as="template">
                  <li :class="[
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]">
                    <span :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]">{{ participant.name }}</span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <div class="mt-2 bg-white rounded-md divide-y divide-gray-200 ring-1 ring-inset ring-gray-300">
          <div class="px-3 py-2 flex gap-4 items-center" v-for="contributor in formData.contributors.value"
            :key="contributor.id">
            <div class="flex-1">
              <p class="text-xs text-gray-900">
                {{ contributor.name }}
              </p>
            </div>

            <button class="w-9 rounded-md bg-transparent px-2 py-1 font-semibold text-rose-600 hover:text-rose-500"
              @click="() => removeContributor(contributor.id)">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div class="mt-2" v-if="formData.contributors.error">
          <p class="text-xs text-red-500">{{ formData.contributors.error }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronLeftIcon, ChevronUpDownIcon, TrashIcon } from '@heroicons/vue/20/solid'

import { useSheetStore } from '@/stores/sheet-store'
import { useItemStore } from '@/stores/items-store'
import { useContributionStore } from '@/stores/contributions-store'
import type { IParticipant } from '@/types/participant'

import PageHeader from '@/components/PageHeader.vue'

interface IFormValueError<T> {
  value: T,
  error: string
}

interface IFormData {
  name: IFormValueError<string>
  description: IFormValueError<string>
  amount: IFormValueError<number>
  paidBy: IFormValueError<IParticipant | null>
  contributors: IFormValueError<IParticipant[]>
}

const route = useRoute()
const router = useRouter()
const sheetStore = useSheetStore()
const itemStore = useItemStore()
const contributionStore = useContributionStore()

const sheetId = computed(() => route.params.id as string)

const sheet = computed(() => {
  return sheetStore.getSheet(sheetId.value)
})

const formDataDefaultValue: IFormData = {
  name: {
    value: '',
    error: ''
  },
  description: {
    value: '',
    error: ''
  },
  amount: {
    value: 0,
    error: ''
  },
  paidBy: {
    value: null,
    error: ''
  },
  contributors: {
    value: [],
    error: ''
  }
}

const formData = ref<IFormData>(formDataDefaultValue)

function validateForm() {
  let valid = true

  if (!formData.value.name.value) {
    formData.value.name.error = 'Name is required.'
    valid = false
  } else {
    formData.value.name.error = ''
  }

  if (formData.value.amount.value <= 0) {
    formData.value.amount.error = 'Amount must be greater than 0.'
    valid = false
  } else {
    formData.value.amount.error = ''
  }

  if (!formData.value.paidBy.value) {
    formData.value.paidBy.error = 'Paid by is required.'
    valid = false
  } else {
    formData.value.paidBy.error = ''
  }

  if (formData.value.contributors.value.length < 1) {
    formData.value.contributors.error = 'Select at least 1 contributor.'
    valid = false
  } else {
    formData.value.contributors.error = ''
  }

  return valid
}

function addItem() {
  if (validateForm()) {
    const id = self.crypto.randomUUID()
    const paidBy = formData.value.paidBy.value as IParticipant
    const amount = formData.value.amount.value
    const contributors = formData.value.contributors.value

    const amountPerContributor = amount / contributors.length

    itemStore.addItem({
      sheetId: sheetId.value,
      id,
      name: formData.value.name.value,
      description: formData.value.description.value,
      amount,
      paidBy,
      contributors,
      amountPerContributor
    })

    contributionStore.addContribution({
      sheetId: sheetId.value,
      itemId: id,
      contributors,
      amount: amountPerContributor
    })

    clearInputs()
    router.back()
  }
}

function clearInputs() {
  formData.value = formDataDefaultValue
}

function removeContributor(id: string) {
  formData.value.contributors.value = formData.value.contributors.value.filter((c) => c.id !== id)
}
</script>

<style scoped></style>
