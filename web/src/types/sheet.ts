import type { IParticipant } from './participant'

export interface ISheet {
  id: string
  name: string
  description?: string
  participants: IParticipant[]
}

export interface ISheetItem {
  id: string
  sheetId: string
  name: string
  description?: string
  amount: number
  paidBy: IParticipant
  contributors: IParticipant[]
  amountPerContributor: number
}
