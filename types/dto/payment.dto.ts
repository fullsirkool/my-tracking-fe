import { BasePagingDto } from './base.dto'

interface IChallenge {
  id: number
  title: string
  startDate: string
  endDate: string
  code: string
  image: string
  ticketPrice: number
  challengeType: string
  status: string
}

interface IUser {
  id: number
  email: string
  profile: string
  name: string
  stravaId: number
}

export interface PaymentDto {
  id: number
  userId: number
  challengeId: number
  amount: number
  isCompleted: boolean
  paymentType: string
  createdAt: Date
  completedAt: Date
  challenge: IChallenge
  user: IUser
}

export interface PaymentQueryDto {
  page: number
  size: number
  createdAt: string
  query: string
}
