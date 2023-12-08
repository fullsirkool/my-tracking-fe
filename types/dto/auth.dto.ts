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

export interface SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    sex: string;
}