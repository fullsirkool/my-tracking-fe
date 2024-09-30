export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

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
  status: PaymentStatus
  paymentType: string
  createdAt: Date
  completedAt: Date
  challenge: IChallenge
  user: IUser
  _count?: any
}

export interface PaymentQueryDto {
  page: number
  size: number
  createdAt: string
  query: string
  challengeId?: number
}

export interface PaymentFilter extends Pick <PaymentQueryDto, 'challengeId' | 'query'> {
  createdDate?: Date
}

export enum PaymentStatusDto {
  REJECT = 'REJECT',
  COMPLETE = 'COMPLETE'
}

export interface UpdatePaymentStatus {
  paymentId: number;
  status: PaymentStatusDto
}