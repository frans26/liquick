import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Storage from '@/utils/local-storage'

export const useCounterStore = defineStore('counter', () => {
  const storedCount = Storage.getItem('count')

  const count = ref(storedCount ? Number(storedCount) : 0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
    Storage.setItem('count', count.value.toString())
  }

  return { count, doubleCount, increment }
})
