import { defineStore } from "pinia";
import challengeRepository from "~/repository/challenge.repository";
import { ChallengeDetailDto, ChallengeUser } from "~/types/dto/challenge.dto";

export const useChallengeStore = defineStore("challenge", () => {
  const challengeId = ref<number>();
  const challengeDetail = ref<ChallengeDetailDto>();
  const challengeUsers = ref<ChallengeUser[]>();

  const fetchChallengeDetail = async (id?: number) => {
    if (id) {
      challengeId.value = id;
    }
    if (challengeId.value) {
      const data = await challengeRepository.findOne(challengeId.value);
      if (data) {
        challengeDetail.value = data;
        await fetchChallengeUsers();
      }
    }
  };

  const fetchChallengeUsers = async (id?: number) => {
    if (id) {
      challengeId.value = id;
    }
    if (challengeId.value) {
      const data = await challengeRepository.findChallengeUser(
        challengeId.value
      );
      if (data) {
        challengeUsers.value = data;
      }
    }
  };

  const image = computed(() => {
    if (!challengeDetail.value) {
      return "";
    }
    return challengeDetail.value.image;
  });

  const rule = computed(() => challengeDetail.value?.rule);

  const target = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return challengeDetail.value?.rule.target;
  });
  const minDistance = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return challengeDetail.value?.rule.minDistance;
  });
  const maxDistance = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return challengeDetail.value?.rule.maxDistance;
  });

  const targetFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return `${(challengeDetail.value?.rule.target / 1000).toFixed(1)}km`;
  });
  const minDistanceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return `${(challengeDetail.value?.rule.minDistance / 1000).toFixed(1)}km`;
  });
  const maxDistanceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return `${(challengeDetail.value?.rule.maxDistance / 1000).toFixed(1)}km`;
  });

  const minPace = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return challengeDetail.value?.rule.minPace;
  });
  const maxPace = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    return challengeDetail.value?.rule.target;
  });
  const minPaceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    const minute = Math.floor(challengeDetail.value?.rule.minPace / 60);
    const second = challengeDetail.value?.rule.minPace % 60;
    return `${minute > 9 ? minute : "0" + minute}:${
      second > 9 ? second : "0" + second
    }`;
  });
  const maxPaceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0;
    }
    const minute = Math.floor(challengeDetail.value?.rule.maxPace / 60);
    const second = challengeDetail.value?.rule.maxPace % 60;
    return `${minute > 9 ? minute : "0" + minute}:${
      second > 9 ? second : "0" + second
    }`;
  });

  return {
    challengeId,
    challengeDetail,
    challengeUsers,
    image,
    rule,
    target,
    targetFormatted,
    minDistance,
    minDistanceFormatted,
    maxDistance,
    maxDistanceFormatted,
    minPace,
    minPaceFormatted,
    maxPace,
    maxPaceFormatted,
    fetchChallengeDetail,
    fetchChallengeUsers,
  };
});
