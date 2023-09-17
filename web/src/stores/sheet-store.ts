import { ref } from 'vue'
import { defineStore } from 'pinia'
import Storage from '@/utils/local-storage'
import type { ISheet, ISheetItem } from '@/types/sheet'

export const useSheetStore = defineStore('sheet', () => {
  const storedSheets = Storage.getItem('sheets')
  const storedItems = Storage.getItem('items')

  const sheets = ref<ISheet[]>(storedSheets ? JSON.parse(storedSheets) : [])
  const items = ref<ISheetItem[]>(storedItems ? JSON.parse(storedItems) : [])

  function addSheet(sheet: ISheet) {
    sheets.value.push(sheet)
    Storage.setItem('sheets', JSON.stringify(sheets.value))
  }

  function getSheet(id: string) {
    return sheets.value.find((sheet) => sheet.id === id)
  }

  function removeSheet(id: string) {
    const newSheets = sheets.value.filter((sheet) => sheet.id !== id)
    Storage.setItem('sheets', JSON.stringify(sheets.value))
    return newSheets
  }

  function getSheetItems(sheetId: string) {
    return items.value.filter((item) => item.sheetId === sheetId)
  }

  function addItem(item: ISheetItem) {
    items.value.push(item)
    Storage.setItem('items', JSON.stringify(items.value))
  }

  return { sheets, addSheet, getSheet, removeSheet, getSheetItems, addItem }
})
