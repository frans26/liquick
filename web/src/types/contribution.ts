import type { IParticipant } from './participant'

export interface IContribution {
  id: string
  sheetId: string
  itemId: string
  participant: IParticipant
  amount: number
}

export interface AddContributionProps extends Omit<IContribution, 'participant' | 'id'> {
  contributors: IParticipant[]
}
