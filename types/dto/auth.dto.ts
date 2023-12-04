import {UserClaims} from './user.dto'

export interface SignInDto {
    expireTime: number
    accessToken: string
    refreshToken: string
    user: UserClaims
}

export interface RenewDto {
    accessToken: string
    refreshToken: string
}

export interface CompleteDto {
    email: string
    password: string
}