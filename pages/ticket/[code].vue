<script setup lang="ts">
import type { ITicketInfo } from '~/types/dto/ticket.dto'
import type { ChallengeDetailDto } from '~/types/dto/challenge.dto.js'
import ticketRepository from '~/repository/ticket.repository'
/**
 * onMounted => api GET /ticket/{code}
 * onCompleted => api POST /ticket
 */

definePageMeta({
  middleware: ['authentication']
})

const route = useRoute()
const { t } = useI18n()

const challengeInfo = ref<ChallengeDetailDto | null>(null)
const ticketInfo = ref<Partial<ITicketInfo> | null>(null)

const isTicketValid = ref(false)
const isFetched = ref(false)

const ticketCode = route.params.code as string

const fetchTicket = async () => {
  try {
    const { data, error } = await ticketRepository.getTicketInfo(ticketCode)
    if (!data.value) throw new Error('No response data')
    challengeInfo.value = data.value.challenge
    ticketInfo.value = Object.assign({}, ticketInfo.value, {
      challengeDistanceId: data.value.challengeDistanceId,
      email: data.value.email,
      name: data.value.name,
      phoneNumber: data.value.phoneNumber,
      address: data.value.address,
      ticketCode: ticketCode,
      isCompleted: data.value.isCompleted,
      raceType: data.value.raceType
    })
    isTicketValid.value = true
  } catch (error) {
    console.error(error)
    isTicketValid.value = false
  } finally {
    isFetched.value = true
  }
}

fetchTicket()
</script>

<template>
  <div>
    <template v-if="isTicketValid && isFetched">
      <div class="text-4xl font-semibold tracking-wide text-center my-5">
        {{ $t('ticket_information') }}
      </div>
      <div class="md:max-w-screen-md md:mx-auto">
        <div class="text-lg mb-5 font-semibold">
          <template v-if="ticketInfo?.isCompleted">
            <Icon name="mdi:check-decagram" color="green" width="30" height="30" />
            {{ $t('registration_success') }}
          </template>
          <span v-else>
            {{ $t('registration_information') }}
          </span>
        </div>
        <div class="flex flex-col-reverse px-4 md:grid md:grid-cols-12 gap-10 md:px-0">
          <div class="col-span-12 md:px-0 md:col-span-7">
            <TicketForm
              v-if="challengeInfo"
              v-bind="{ ...challengeInfo, ...ticketInfo }"
              @success="fetchTicket"
            />
          </div>
          <div
            class="col-span-12 md:col-span-5 relative after:contents-[''] md:after:absolute md:after:-left-2 md:after:top-0 md:after:h-full md:after:block md:after:w-0.5 md:after:bg-slate-200"
          >
            <TicketInfo
              v-if="challengeInfo"
              v-bind="{ ...challengeInfo, ...ticketInfo }"
              class="md:pl-5"
            />
          </div>
        </div>
      </div>
    </template>

    <div v-if="!isTicketValid && isFetched">
      <div class="h-60 flex justify-center items-center">
        <Icon
          name="mdi:emoticon-sad-outline"
          width="20"
          height="20"
          class="mr-2"
        />
        <span class="text-xl">
          {{ $t('no_ticket_available') }}
        </span>
      </div>
      <div class="flex justify-center items-center">
        <NuxtLink
          to="/challenge"
          class="text-blue-500 hover:text-blue-600 hover:underline"
        >
          {{ $t('back_to_challenge') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
