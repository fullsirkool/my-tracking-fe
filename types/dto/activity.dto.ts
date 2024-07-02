import {BasePagingDto, BasePagingResponse} from './base.dto'

export enum ActivityType {
    Run = 'RUN',
}

export enum ActivityCreationType {
    SYNCHRONOUS = 'SYNCHRONOUS',
    MANUAL = 'MANUAL'
}

export interface ActivityMontlyDto {
    date: string
    id: string
}

export interface ActivityDto {
    id: number
    distance: number
    movingTime: number
    elapsedTime: number
    startDateLocal: Date
    userId: number
}

export type DailyActivityDto = Pick<
    ActivityDto,
    'id' | 'distance' | 'movingTime' | 'elapsedTime' | 'startDateLocal' | 'userId'
>

export interface StatisticsDto {
    distance: number
    pace: number
    count: number
    totalMovingTime: number
}

export interface FindActivityDto extends BasePagingDto {
    date: string
    id: string
}

export interface ActivityDetail {
    averageSpeed: number
    distance: number
    elapsedTime: number
    id: string
    maxSpeed: number
    movingTime: number
    name: string
    startDate: string
    startDateLocal: string
    totalElevationGain: number
    type: ActivityType
    userId: 1
    visibility: string
    timezone: string
    imageUrl: string
    activityType: ActivityCreationType
}

export interface FindActivityResponse
    extends BasePagingResponse<ActivityDetail> {
}


export interface ManualCreateActivityDto {
    distance: number
    startDate: string
    movingTime: string
    imageUrl: string | undefined | null
}