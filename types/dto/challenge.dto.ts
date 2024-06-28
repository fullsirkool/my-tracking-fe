import { ChallengeStatus, ChallengeType } from '../enum/challenge.enum'
import { BasePagingDto, BasePagingResponse } from './base.dto'
import { UserClaims } from './user.dto'

export interface Rule {
  id: number
  title: string
  target: number
  minPace: number
  maxPace: number
  minDistance: number
  maxDistance: number
}

export interface Challenge {
  id: number
  title: string
  startDate: Date
  endDate: Date
  code: string
  challengeType: ChallengeType
  status: ChallengeStatus
  image: string
  rule: Rule
}

export interface CreateChallengeDto {
  title: string
  startDate: Date
  endDate: Date
  image: string | null | undefined
  target: number | undefined
  minPace: number | undefined
  maxPace: number | undefined
  minDistance: number | undefined
  maxDistance: number | undefined
  status: ChallengeStatus
  challengeType: ChallengeType
}

export class PagingChallengeDto extends BasePagingDto {}

export class PagingChallengeResponse extends BasePagingResponse<Challenge> {}

export interface ActivityStatistics {
  distance: number
  movingTime: number
  elapsedTime: number
  startDateLocal: Date
}

export interface ChallengeUserActivities {
  user: UserClaims
  statistics: ActivityStatistics[]
}

export interface ChallengeDetailDto extends Challenge {
  userActivities: ChallengeUserActivities[]
}

export interface ChallengeDailyActivity {
  id: number
  distance: number
  movingTime: number
  elapsedTime: number
  startDateLocal: string
  userId: number
  challengeId: number
}

export interface ChallengeUser {
  id: number
  name: string
  last_name: string
  profilelong: string
  target: number
  totaldistance: number
  process: number
}

export interface ChallengeUserParam extends BasePagingDto {
  id: number
  sort?: string
}

export interface ChallengeUserResponse
  extends BasePagingResponse<ChallengeUser> {}

export interface JoinChallengeResponse {
  qrCode: string
  qrDataURL: string
  paymentId: number
  accountNo: string
  bankName: string
}
