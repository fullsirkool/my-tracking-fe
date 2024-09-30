<script setup lang="ts">
import type { ChallengeDetailDto } from '~/types/dto/challenge.dto.js'
import { FomatterType } from '~/utils/fomatter.js'
import type { ITicketInfo } from '~/types/dto/ticket.dto'

type TicketChallengeInfo = Omit<ChallengeDetailDto, 'userActivities' | 'rule'>
const props = defineProps<TicketChallengeInfo & Partial<ITicketInfo>>()

</script>

<template>
  <div>
    <div class="text-lg font-semibold">{{ $t('challenge_detail') }}</div>
    <div>
      <TicketInfoItem
        class="mt-5 mb-2.5"
        :label="$t('challenge_title')"
        :value="$props.title"
      />
      <TicketInfoItem
        class="mb-2.5"
        :label="$t('location')"
        :value="$props.location"
      />
      <TicketInfoItem
        class="mb-2.5"
        :label="$t('start_date')"
        :value="
          $dayjs($props.startDate)
            .tz('Asia/Bangkok')
            .format('HH:mm - DD/MM/YYYY')
        "
      />
      <TicketInfoItem
        class="mb-2.5"
        :label="$t('end_date')"
        :value="
          $dayjs($props.endDate).tz('Asia/Bangkok').format('HH:mm - DD/MM/YYYY')
        "
      />
      <TicketInfoItem
        class="mb-2.5"
        :label="$t('ticket_price')"
        :value="number.format($props.ticketPrice)"
      />
      <TicketInfoItem
        class="mb-2.5"
        :label="$t('challenge_type')"
        :value="$t(`${$props.raceType}`.toLowerCase())"
      />
    </div>
  </div>
</template>
