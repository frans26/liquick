<template>
  <main class="w-full min-h-screen flex justify-center p-6 bg-stone-100">
    <div class="w-full max-w-md">
      <h4 class="text-center text-2xl font-semibold">Add Sheet</h4>

      <div class="mt-4">
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>

        <div class="mt-1">
          <input type="text" name="name" id="name" v-model="name"
            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <label for="desc" class="block text-sm font-medium leading-6 text-gray-900">Description</label>

        <div class="mt-1">
          <textarea type="text" name="desc" id="desc" rows="3" v-model="description"
            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-medium leading-6 text-gray-900">Participants</label>

        <form @submit.prevent="addParticipant" class="mt-2 flex gap-4 items-center">
          <input type="text" name="participant" id="participant" v-model.trim="participantName"
            class="flex-1 lock w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
          <button type="submit"
            class="w-9 rounded-md bg-blue-600 px-2 py-1 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <PlusIcon class="text-white h-5 w-5" />
          </button>
        </form>

        <div class="mt-2 flex gap-4 items-center" v-for="participant in participantList" :key="participant.id">
          <div class="flex-1">
            <p class="text-xs text-gray-900">
              {{ participant.name }}
            </p>
          </div>

          <button class="w-9 rounded-md bg-transparent px-2 py-1 font-semibold text-rose-600 hover:text-rose-500"
            @click="() => removeParticipant(participant.id)">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-2" v-if="showError">
          <p class="text-xs text-red-500">Min of 2 and max of 20 participants</p>
        </div>
      </div>

      <div class="mt-4">
        <button
          class="block w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          @click="saveSheet">
          Save
        </button>
      </div>

      <div class="mt-4">
        <button
          class="block w-full rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          @click="() => router.back()">
          Cancel
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, TrashIcon } from '@heroicons/vue/20/solid'

import { useSheetStore } from '@/stores/sheet-store'
import type { IParticipant } from '@/types/participant'

const router = useRouter()
const sheetStore = useSheetStore()

const name = ref('')
const description = ref('')
const participantName = ref('')
const participantList = ref<IParticipant[]>([])
const showError = ref(false)

function addParticipant() {
  const nameExist = participantList.value.find((p) => p.name === participantName.value)

  if (!nameExist) {
    participantList.value.push({
      id: self.crypto.randomUUID(),
      name: participantName.value
    })
    participantName.value = ''
    showError.value = false
  }
}

function removeParticipant(id: string) {
  participantList.value = participantList.value.filter((p) => p.id !== id)
}

function saveSheet() {
  if (participantList.value.length < 2 || participantList.value.length > 20) {
    showError.value = true
  } else {
    const id = self.crypto.randomUUID()

    sheetStore.addSheet({
      id,
      name: name.value,
      description: description.value,
      participants: participantList.value
    })

    clearInputs()
    router.replace(`/sheet/${id}`)
  }
}

function clearInputs() {
  name.value = ''
  description.value = ''
  participantList.value = []
  participantName.value = ''
  showError.value = false
}
</script>

<style scoped></style>
