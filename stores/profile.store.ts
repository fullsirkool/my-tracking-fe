import { defineStore } from 'pinia'
import activityRepository from '~/repository/activity.repository'
import userRepository from '~/repository/user.repository'
import type { ActivityDto, ActivityDetail } from '~/types/dto/activity.dto'
import type { UserClaims } from '~/types/dto/user.dto'
import type { Challenge } from '~/types/dto/challenge.dto'
import challengeRepository from '~/repository/challenge.repository'

export const useProfileStore = defineStore('profile', () => {
  const chartDate = ref(new Date())
  const activities = ref<ActivityDto[]>([])

  const userId = ref<string>('')
  const user = ref<UserClaims | null>(null)

  const activitiesDetail = ref<ActivityDetail[] | null>([])
  const detailPage = ref(1)
  const detailSize = ref(9)
  const totalDetailPage = ref(1)
  const totalActivities = ref(0)

  const joinedChallenges = ref<Challenge[]>([])
  const joinedChallengePage = ref(1)
  const joinedChallengePageSize = ref(9)
  const totalJoinedChallenge = ref(1)
  const totalJoinedChallengePage = ref(0)

  const fetchJoinedChallenge = async (params: { page?: number }) => {
    try {
      console.log('fetch joined challenge')
      const { page } = params
      if (page) {
        joinedChallengePage.value = page
      }

      const param = {
        page: joinedChallengePage.value,
        size: joinedChallengePageSize.value,
      }

      const response = await challengeRepository.findJoinedChallenge(
        userId.value,
        param,
      )

      console.log('joined challenge response', response)

      if (response) {
        const { data, totalPages, totalElement } = response
        joinedChallenges.value = data
        totalJoinedChallenge.value = totalElement
        totalJoinedChallengePage.value = totalPages
      }
    } catch (error) {}
  }

  const handleChangeMonth = async (sign: string) => {
    if (sign === '+') {
      chartDate.value = new Date(
        chartDate.value.getFullYear(),
        chartDate.value.getMonth() + 1,
        10,
      )
    } else {
      chartDate.value = new Date(
        chartDate.value.getFullYear(),
        chartDate.value.getMonth() - 1,
        10,
      )
    }
    await fetchMonthlyActivitiesDetail({ page: 1 })
    await fetchDailyActivityStatistics()
  }
  const fetchDailyActivityStatistics = async () => {
    try {
      const data = await activityRepository.fetchMonthlyActivities({
        date: chartDate.value.toISOString(),
        id: userId.value,
      })
      activities.value = data ?? []
    } catch (error) {}
  }

  const fetchMonthlyActivitiesDetail = async (params: {
    fromWatch?: Boolean
    page?: number
  }) => {
    try {
      const { fromWatch, page } = params
      if (!fromWatch && page) {
        detailPage.value = page
      }
      const res = await activityRepository.fetchMonthlyActivitiesDetail({
        page: detailPage.value,
        size: detailSize.value,
        date: chartDate.value.toISOString(),
        id: userId.value,
      })

      if (res) {
        const { data, totalPages, totalElement } = res
        activitiesDetail.value = data
        totalDetailPage.value = totalPages
        totalActivities.value = totalElement
      }
    } catch (error) {}
  }

  const fetchUserInfo = async (id: string) => {
    try {
      if (id) {
        userId.value = id
      }
      console.log('id check', userId.value)
      const data = await userRepository.fetchUserInfo(userId.value)
      user.value = data
    } catch (error) {}
  }

  watch(detailPage, async () => {
    await fetchMonthlyActivitiesDetail({ fromWatch: true })
  })

  return {
    chartDate,
    activities,
    userId,
    user,
    activitiesDetail,
    detailPage,
    detailSize,
    totalDetailPage,
    totalActivities,
    joinedChallenges,
    joinedChallengePage,
    joinedChallengePageSize,
    totalJoinedChallenge,
    totalJoinedChallengePage,
    handleChangeMonth,
    fetchDailyActivityStatistics,
    fetchMonthlyActivitiesDetail,
    fetchUserInfo,
    fetchJoinedChallenge,
  }
})
