import { defineStore } from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import type {
  ChallengeDetailDto,
  ChallengeUser,
  Challenge,
  ChallengeUserParam,
} from '~/types/dto/challenge.dto'

export const useChallengeStore = defineStore('challenge', () => {
  const challengeId = ref<number>()
  const challengeDetail = ref<ChallengeDetailDto>()
  const challengeUsers = ref<ChallengeUser[]>()
  const challengeUsersPage = ref(1)
  const challengeUsersPageSize = ref(9)
  const totalChallengeUsers = ref(0)
  const totalChallengeUsersPage = ref(1)
  const topChallenge = ref<Challenge>()

  const fetchChallengeDetail = async (id?: number) => {
    if (id) {
      challengeId.value = id
    }
    if (challengeId.value) {
      const data = await challengeRepository.findOne(challengeId.value)
      if (data) {
        challengeDetail.value = data
      }
    }
  }

  const setTopChallenge = (challenge: Challenge) => {
    topChallenge.value = challenge
  }

  const fetchChallengeUsers = async (params: {
    id?: number
    page?: number
    size?: number
    sort?: string
  }) => {
    if (params?.id) {
      challengeId.value = params.id
    }
    if (params.page) {
      challengeUsersPage.value = params.page
    }
    if (params.size) {
      challengeUsersPageSize.value = params.size
    }

    if (challengeId.value) {
      const param: ChallengeUserParam = {
        id: challengeId.value,
        page: challengeUsersPage.value,
        size: challengeUsersPageSize.value,
      }

      if (params.sort) {
        console.log(params.sort)
        param.sort = params.sort
      }

      const res = await challengeRepository.findChallengeUser(
        challengeId.value,
        param,
      )
      if (res) {
        challengeUsers.value = res.data
        totalChallengeUsers.value = res.totalElement
        totalChallengeUsersPage.value = res.totalPages
      }
    }
  }

  const image = computed(() => {
    if (!challengeDetail.value) {
      return ''
    }
    return challengeDetail.value.image
  })

  const rule = computed(() => challengeDetail.value?.rule)

  const target = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.rule.target
  })
  const ticketPrice = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.ticketPrice
  })
  const minDistance = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.rule.minDistance
  })
  const maxDistance = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.rule.maxDistance
  })

  const targetFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return `${(challengeDetail.value?.rule.target / 1000).toFixed(1)}km`
  })
  const minDistanceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return `${(challengeDetail.value?.rule.minDistance / 1000).toFixed(1)}km`
  })
  const maxDistanceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return `${(challengeDetail.value?.rule.maxDistance / 1000).toFixed(1)}km`
  })

  const minPace = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.rule.minPace
  })
  const maxPace = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    return challengeDetail.value?.rule.maxPace
  })
  const minPaceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    const minute = Math.floor(challengeDetail.value?.rule.minPace / 60)
    const second = challengeDetail.value?.rule.minPace % 60
    return `${minute > 9 ? minute : '0' + minute}:${
      second > 9 ? second : '0' + second
    }`
  })
  const maxPaceFormatted = computed(() => {
    if (!challengeDetail.value) {
      return 0
    }
    const minute = Math.floor(challengeDetail.value?.rule.maxPace / 60)
    const second = challengeDetail.value?.rule.maxPace % 60
    return `${minute > 9 ? minute : '0' + minute}:${
      second > 9 ? second : '0' + second
    }`
  })
  const startDate = computed(() => challengeDetail.value?.startDate)
  const endDate = computed(() => challengeDetail.value?.endDate)

  const distances = computed(() => challengeDetail.value?.challengeDistances)

  const challengeType = computed(() => challengeDetail.value?.challengeType)

  return {
    challengeId,
    challengeDetail,
    challengeUsers,
    challengeUsersPage,
    challengeUsersPageSize,
    totalChallengeUsers,
    totalChallengeUsersPage,
    topChallenge,
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
    startDate,
    endDate,
    ticketPrice,
    distances,
    challengeType,
    fetchChallengeDetail,
    fetchChallengeUsers,
    setTopChallenge,
  }
})
