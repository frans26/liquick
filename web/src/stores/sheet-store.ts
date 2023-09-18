import { ref } from 'vue'
import { defineStore } from 'pinia'
import Storage from '@/utils/local-storage'
import type { ISheet } from '@/types/sheet'

export const useSheetStore = defineStore('sheets', () => {
  const storedSheets = Storage.getItem('sheets')

  const sheets = ref<ISheet[]>(storedSheets ? JSON.parse(storedSheets) : [])

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

  return { sheets, addSheet, getSheet, removeSheet }
})
