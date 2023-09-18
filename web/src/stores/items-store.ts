import { ref } from 'vue'
import { defineStore } from 'pinia'
import Storage from '@/utils/local-storage'
import type { ISheetItem } from '@/types/sheet'

export const useItemStore = defineStore('items', () => {
  const storedItems = Storage.getItem('items')

  const items = ref<ISheetItem[]>(storedItems ? JSON.parse(storedItems) : [])

  function getSheetItems(sheetId: string) {
    return items.value.filter((item) => item.sheetId === sheetId)
  }

  function addItem(item: ISheetItem) {
    items.value.push(item)
    Storage.setItem('items', JSON.stringify(items.value))
  }

  return { getSheetItems, addItem }
})
