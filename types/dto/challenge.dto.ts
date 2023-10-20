import { ChallengeStatus, ChallengeType } from "../enum/challenge.enum";

export interface Challenge {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  ownerId: number;
  code: string;
  challengeType: ChallengeType;
  status: ChallengeStatus;
}


export interface CreateChallengeDto {
  title: string;
  startDate: Date;
  endDate: Date;
  ruleTitle: string | undefined;
  minPace: number | undefined;
  maxPace: number | undefined;
  minDistance: number | undefined;
  maxDistance: number | undefined;
  status: ChallengeStatus;
  challengeType: ChallengeType;
}
