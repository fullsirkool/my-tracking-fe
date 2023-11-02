import { ChallengeStatus, ChallengeType } from "../enum/challenge.enum";
import { BasePagingDto, BasePagingResponse } from "./base.dto";
import { UserClaims } from "./user.dto";

export interface Challenge {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  ownerId: number;
  code: string;
  challengeType: ChallengeType;
  status: ChallengeStatus;
  image: string;
  owner: UserClaims;
}

export interface CreateChallengeDto {
  title: string;
  startDate: Date;
  endDate: Date;
  image: string | null | undefined;
  ruleTitle: string | undefined;
  minPace: number | undefined;
  maxPace: number | undefined;
  minDistance: number | undefined;
  maxDistance: number | undefined;
  status: ChallengeStatus;
  challengeType: ChallengeType;
}

export class PagingChallengeDto extends BasePagingDto {}
export class PagingChallengeResponse extends BasePagingResponse<Challenge> {}

export interface ChallengeDetailDto extends Challenge {
  userActivitites: ChallengeUserActivities[];
}

export interface ChallengeUserActivities {
  user: UserClaims;
  statistics: ActivityStatistics[];
}

export interface ActivityStatistics {
  distance: number;
  movingTime: number;
  elapsedTime: number;
  startDateLocal: Date;
}
