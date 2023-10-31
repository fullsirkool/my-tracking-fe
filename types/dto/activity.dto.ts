import { BasePagingDto, BasePagingResponse } from "./base.dto";

export interface ActivityMontlyDto {
  date: string;
  stravaId: string;
}

export interface ActivityDto {
  id: number;
  distance: number;
  movingTime: number;
  elapsedTime: number;
  startDateLocal: Date;
  userId: number;
}

export type DailyActivityDto = Pick<
  ActivityDto,
  "id" | "distance" | "movingTime" | "elapsedTime" | "startDateLocal" | "userId"
>;

export interface StatisticsDto {
  distance: number;
  pace: number;
  count: number;
  totalMovingTime: number;
}

export interface FindActivityDto extends BasePagingDto {
  date: Date;
  stravaId: number;
}

export interface FindActivityResponse extends BasePagingResponse<ActivityDto> {}
