<template>
  <TransitionRoot appear :show="modalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ content }}
                </p>
              </div>

              <div class="mt-4 flex items-center space-x-3">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200"
                  @click="clickConfirm">
                  Confirm
                </button>

                <button type="button"
                  class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-blue-500 shadow-sm hover:bg-blue-100"
                  @click="closeModal">
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

defineProps<{
  title: string
  content?: string
}>()

const emit = defineEmits<{
  (event: 'confirm'): void
}>()

const modalOpen = ref(false)

function closeModal() {
  modalOpen.value = false
}

function clickConfirm() {
  modalOpen.value = false
  emit('confirm')
}
</script>

<style scoped></style>
