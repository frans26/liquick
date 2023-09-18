import { ref } from 'vue'
import { defineStore } from 'pinia'
import Storage from '@/utils/local-storage'
import type { IContribution, AddContributionProps } from '@/types/contribution'

export const useContributionStore = defineStore('contributions', () => {
  const storedContributions = Storage.getItem('contributions')

  const contributions = ref<IContribution[]>(
    storedContributions ? JSON.parse(storedContributions) : []
  )

  function addContribution(props: AddContributionProps) {
    props.contributors.forEach((d) => {
      const contribution: IContribution = {
        id: self.crypto.randomUUID(),
        sheetId: props.sheetId,
        itemId: props.itemId,
        participant: { ...d },
        amount: props.amount
      }
      contributions.value.push(contribution)
      Storage.setItem('contributions', JSON.stringify(contributions.value))
    })
  }

  function getPerParticipantInSheet(sheetId: string, participantId: string) {
    return contributions.value.filter(
      (c) => c.participant.id === participantId && c.sheetId === sheetId
    )
  }

  function sheetContributions(sheetId: string) {
    return contributions.value.filter((c) => c.sheetId === sheetId)
  }

  function totalAmount(sheetId: string) {
    return sheetContributions(sheetId).reduce((a, c) => a + c.amount, 0)
  }

  function amountToPay(sheetId: string, participantId: string) {
    return getPerParticipantInSheet(sheetId, participantId).reduce((a, c) => a + c.amount, 0)
  }

  return {
    contributions,
    addContribution,
    getPerParticipantInSheet,
    sheetContributions,
    totalAmount,
    amountToPay
  }
})
