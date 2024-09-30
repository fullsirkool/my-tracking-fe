import type { ChallengeDistanceType } from '~/types/dto/challenge.dto'

export interface IAthleteRecord {
  challengeDistance: ChallengeDistanceType
  challengeDistanceId: number
  challengeId: number
  email: string
  groupId: string
  id: number
  isCompleted: boolean
  isPaid: boolean
  name: string
  paymnetId: string
  phoneNumber: string
  registedAt: string
  ticketCode: string
  userId: number
  address: string
  gender?: string
}

export interface IAthleteListResponse {}

export interface IAthleteFilter {
  query: string
  id: number
}
