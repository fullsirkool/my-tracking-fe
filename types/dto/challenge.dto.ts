import { ChallengeStatus, ChallengeType } from '../enum/challenge.enum'
import { BasePagingDto, BasePagingResponse } from './base.dto'
import { type UserClaims } from './user.dto'
import { TicketDto } from '~/types/dto/ticket.dto'

export interface Rule {
  id: number
  title: string
  target: number
  minPace: number
  maxPace: number
  minDistance: number
  maxDistance: number
}

export type ChallengeDistanceType = {
  id: number
  distance: number
  challengeId: number
}

export interface ChallengeGroup {
  id: number
  name: string
  challengeId: number
}

export interface Challenge {
  id: number
  title: string
  location: string
  startDate: string
  endDate: string
  code: string
  challengeType: ChallengeType
  status: ChallengeStatus
  image: string
  rule: Rule
  description: string
  ticketPrice: number
  challengeDistances: ChallengeDistanceType[]
  challengeGroups: ChallengeGroup[]
}

export interface DistanceDto {
  distance: number
  quantity: number
}

export interface UpdateDistanceDto extends DistanceDto{
  id: number
}

export interface CreateChallengeDto {
  title: string
  startDate: Date
  endDate: Date
  ticketPrice: number | undefined
  image: string | null | undefined
  targets: DistanceDto[] | undefined
  minPace: number | undefined
  maxPace: number | undefined
  minDistance: number | undefined
  maxDistance: number | undefined
  description: string
  location: string
  challengeType: ChallengeType | undefined
}

export interface UpdateChallengeDto extends CreateChallengeDto {
  id: number
  targets: UpdateDistanceDto[] | undefined
}

export interface PagingChallengeDto extends BasePagingDto {
  availability?: 'ENDED' | 'NOT_ENDED' | ''
}

export class PagingTopChallengeDto extends BasePagingDto {}

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

export interface ChallengeDistance {
  id: number
  challengeId: number
  distance: number
  quantity: number
  defaultQuantity: number
}

export interface ChallengeDetailDto extends Challenge {
  userActivities: ChallengeUserActivities[]
  challengeDistances: ChallengeDistance[]
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
  profile_long?: any
}

export interface ChallengeUserParam extends BasePagingDto {
  id: number
  sort?: string
}

export interface ChallengeUserResponse
  extends BasePagingResponse<ChallengeUser> {}

export interface PaymentInfor {
  qrCode: string
  qrDataURL: string
  paymentCode: number
  accountNo: string
  bankName: string
  accountName: string
  ticketPrice: number
  paymentMessage: string
}

export enum JoinChallengeStatus {
  COMPLETED = 'COMPLETED',
  WAITING = 'WAITING',
}

export interface JoinChallengeResponse {
  paymentInfor?: PaymentInfor
  status: JoinChallengeStatus
}

export interface CheckedJoinChallengeResponse {
  joined: boolean
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IChallengeRegisterInfo {
  name: string
  email: string
  phoneNumber: string
  // address: string
  gender?: Gender
  raceType: string
}

export type IChallengeDistanceRegistrationInfo = {
  distance: number
  challengeDistanceId: number
  numberOfPlayer: number
}

export interface IChallengeIndividualRegisterInfo
  extends IChallengeRegisterInfo {
  challengeDistanceId: number
  address: string
}

export interface IChallengeGroupRegisterInfo extends IChallengeRegisterInfo {
  groupName: string
  challengeDistances: IChallengeDistanceRegistrationInfo[] | ComputedRef<IChallengeDistanceRegistrationInfo[]>
}

export interface ChallengeIndividualRegisterResponse {}

export interface ChallengeGroupRegisterResponse {}

export interface DeleteChallengeDto {
  id: number
}

export interface ChallengePlayer extends TicketDto {
  challengeDistance: ChallengeDistance
}

export interface ChallengeGroup {
  id: number
  name: string
  totaldistance: number
}