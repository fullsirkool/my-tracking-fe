import {BasePagingDto} from './base.dto'
import {
    ChallengeDetailDto,
    ChallengeDistance, ChallengePlayer,
    IChallengeGroupRegisterInfo,
    IChallengeIndividualRegisterInfo
} from '~/types/dto/challenge.dto'
import type {PaymentDto} from '~/types/dto/payment.dto'
import {Gender} from "~/types/dto/challenge.dto";

export interface TicketPagingDto extends BasePagingDto {
}

export interface TicketOfGroupPagingDto extends TicketPagingDto {
}

export interface TicketGroupCountDto {
    challengePlayers: number
}

export interface TicketGroupDto {
    id: number,
    groupName: string,
    representativeName: string,
    representativeEmail: string,
    representativePhoneNumber: string,
    challengeId: number,
    leaderId: number,
    paymentId: number,
    payment: PaymentDto
    challenge: ChallengeDetailDto,
    challengePlayers: ChallengePlayer[],
    _count: TicketGroupCountDto
}

export interface TicketDto {
    id: number,
    ticketCode: string,
    name: string,
    phoneNumber: string,
    email: string,
    registedAt: string,
    address: string,
    gender: Gender,
    isPaid: boolean,
    isCompleted: boolean,
    challengeId: number,
    groupId: number,
    challengeDistanceId: number,
    paymentId: number,
    userId: number,
    challenge: ChallengeDetailDto,
    challengeDistance: ChallengeDistance
}

export interface ITicket {
}

export interface ITicketIndividual {
}

export interface ITicketGroup {
}

export interface ITicketGroup {
}

export interface ITicketRegistrationInfo {
    ticketCode: string
    name: string
    email: string
    phoneNumber: string
    address: string
    challengeDistanceId?: number
    gender?: Gender
}

export interface ITicketInfo extends Partial<ITicketRegistrationInfo> {
    registedAt: string
    isPaid: boolean
    isCompleted: boolean
    challenge: ChallengeDetailDto
    group: ITicketGroup
    groupId: number
    raceType: string
}

export interface IUpdateTicketInformation extends IChallengeIndividualRegisterInfo {
    id: number
}

export interface IUpdateGroupTicketInformation extends IChallengeGroupRegisterInfo {
    id: number
}