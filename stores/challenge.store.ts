import { defineStore } from "pinia";
import challengeRepository from "~/repository/challenge.repository";
import { ChallengeDetailDto } from "~/types/dto/challenge.dto";

export const useChallengeStore = defineStore("challenge", () => {
  const challengeId = ref<number>();
  const challengeDetail = ref<ChallengeDetailDto>();

  const fetchChallengeDetail = async (id?: number) => {
    if (id) {
      challengeId.value = id;
    }
    if (challengeId.value) {
      const data = await challengeRepository.findOne(challengeId.value);
      if (data) {
        challengeDetail.value = data;
      }
    }
  };

  return {
    challengeId,
    challengeDetail,
    fetchChallengeDetail,
  };
});
