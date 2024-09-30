<template>
  <UContainer class="mb-20">
    <div class="mt-10">
      <UCard class="rounded-xl bg-[#f5f5f5] overflow-auto min-h-[300px]">
        <div>
          <div
              class="relative overflow-hidden ml-0 mr-2.5 mt-0 mb-2.5 pb-[56.25%]"
          >
            <img
                :src="image"
                class="absolute w-full h-full object-contain left-0 top-0 object-[50%_0%]"
            />
          </div>
          <div class="md:p-5 md:mt-5">
            <div class="text-left">
              <h1 class="text-4xl font-semibold mt-10 mb-5 md:mt-0">
                {{ challengeDetail?.title }}
              </h1>
            </div>
            <div
                v-if="challengeDetail?.description"
                class="custom-content min-h-[120px] text-justify"
            >
              <div v-html="challengeDetail?.description"/>
            </div>
            <div
                class="mt-5 p-2 gap-5 flex flex-col-reverse md:flex-row items-center justify-center"
            >
              <div v-if="!isAdmin && !isEnded" class="flex">
                <UInput
                    v-model="ticketCode"
                    :placeholder="$t('enter_ticket_code')"
                    size="xl"
                    class="rounded-tr-none rounded-br-none"
                />
                <UButton
                    :label="$t('register_by_ticket')"
                    size="xl"
                    @click="redirectToTicketCode"
                />
              </div>

              <UButton
                  v-if="!isAdmin && !isEnded"
                  size="xl"
                  @click="handleConfirmJoinChallenge"
              >
                {{ $t('join_challenge') }}
              </UButton>
              <div v-if="isAdmin" class="flex items-center justify-center gap-4">
                <UButton size="xl" @click="handleEditChallenge">
                  {{ $t('edit_challenge') }}
                </UButton>
                <div>
                  <UButton
                      :label="$t('delete_challenge')"
                      size="xl"
                      variant="outline"
                      @click="isOpenDeleteModal = true"
                  >
                  </UButton>
                  <UModal v-model="isOpenDeleteModal" :transition="false">
                    <UCard>
                      <div class="space-y-2 flex flex-col gap-4 text-center">
                        <p>{{ $t('delete_challenge_question') }}</p>
                        <div class="flex items-center justify-center gap-4">
                          <UButton
                              :label="$t('delete_challenge')"
                              size="md"
                              @click="handleDeleteChallenge"
                          >
                          </UButton>
                          <UButton
                              :label="$t('cancel')"
                              size="md"
                              variant="outline"
                              @click="isOpenDeleteModal = false"
                          >
                          </UButton>
                        </div>
                      </div>
                    </UCard>
                  </UModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-auto-rows-min-content mt-10"
    >
      <div
          class="col-span-1 rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[200px]"
          style="box-shadow: none"
      >
        <ChallengeDetailTable/>
      </div>
      <div
          class="col-span-1 rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[200px]"
          style="box-shadow: none"
      >
        <ChallengeDistanceTable/>
      </div>
    </div>
<!--    <ChallengeProgressTable :id="id"/>-->

    <ChallengeDirectModal
        v-if="id"
        v-model="isOpenChallengeDirectModal"
        :challenge="challengeDetail"
    />
  </UContainer>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import {useChallengeStore} from '~/stores/challenge.store'
import {useUserStore} from '~/stores/user.store'
import {useAdminStore} from '~/stores/admin.store'
import {type DeleteChallengeDto} from "~/types/dto/challenge.dto";

definePageMeta({
  middleware: ['authentication'],
})

const toast = useToast()
const {t} = useI18n()
const dayjs = useDayjs()

const challengeStore = useChallengeStore()
const {user} = useUserStore()
const adminStore = useAdminStore()
const {fetchChallengeDetail, fetchChallengeUsers} = challengeStore
const {image, challengeDetail, endDate} = storeToRefs(challengeStore)
const {params, fullPath} = useRoute()
const {id} = params

const isJoinedChallenge = ref(false)
const isAdmin = computed(() => adminStore.isSignedIn)
const isOpenChallengeDirectModal = ref(false)
const ticketCode = ref('')
const isOpenDeleteModal = ref(false)

await useAsyncData('challenge', async () => {
  const [_a, _b, checkJoined] = await Promise.all([
    fetchChallengeDetail(+id),
    fetchChallengeUsers({
      id: +id,
      page: 1,
      size: 10,
    }),
    challengeRepository.checkJoinedChallenge(+id),
  ])
  console.log('😻 ~ awaituseAsyncData ~ checkJoined:', checkJoined)

  isJoinedChallenge.value = checkJoined?.joined || false
})

const isEnded = computed(() => {
  return dayjs().isAfter(dayjs(endDate.value))
})

const handleConfirmJoinChallenge = async () => {
  if (isEmpty(user) || !user) {
    localStorage.setItem('saved-path', fullPath)
    navigateTo('/signin')
    return
  }

  isOpenChallengeDirectModal.value = true
}

const handleEditChallenge = () => {
  if (challengeDetail.value?.id) {
    const id = challengeDetail.value.id
    navigateTo(`/challenge/${id}/edit`)
  }
}

const redirectToTicketCode = () => {
  if (ticketCode.value) {
    navigateTo(`/ticket/${ticketCode.value}`)
  } else {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
      timeout: 5000,
      title: t('please_input_ticket_code'),
    })
  }
}
const handleDeleteChallenge = async () => {
  const payload: DeleteChallengeDto = {id: +id}
  const {data, error} = await challengeRepository.delete(payload)
  if (error) {
    console.error(error)
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message,
    })
    return
  }

  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-exclamation-circle',
    color: 'green',
    timeout: 4000,
    title: t('deleted_successfully'),
  })

  navigateTo('/challenge')
}

</script>
