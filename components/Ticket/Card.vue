<script setup lang="ts">
import type { TicketDto } from '~/types/dto/ticket.dto'
import { PaymentStatus } from '~/types/dto/payment.dto'

interface ITicketCardProps {
  ticket: TicketDto
  redirectUrl: string
}

const toast = useToast()
const { t } = useI18n()

const props = withDefaults(defineProps<ITicketCardProps>(), {})

const ticket = computed(() => props.ticket)

const handleCopyTicketCode = (ticketCode: string) => {
  navigator.clipboard.writeText(ticketCode)
  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    color: 'green',
    title: t('copied_ticket_code_to_clipboard')
  })
}
</script>
<template>
  <div
    class="mb-2.5 border bg-white border-slate-200 p-4 rounded-xl"
  >
    <div>
      <div>
        <div class="font-semibold text-lg">
          {{ ticket.challenge.title }}
        </div>
        <div>
          <div>
            <span v-if="!ticket.isPaid" class="text-red-500">{{$t('not_paid')}}</span>
            <span v-else-if="ticket.isCompleted" class="text-green-500">{{$t('completed')}}</span>
            <span v-else class="text-red-500">{{$t('not_completed')}}</span>
          </div>
        </div>
        <div v-if="ticket.isPaid">
          <span class="font-semibold text-lg">{{ $t('ticket_code') }}: </span>
          <UButton variant="link" @click="handleCopyTicketCode(ticket.ticketCode)" class="p-0">
            <span class="font-semibold text-lg flex items-center gap-1">
              {{ ticket.ticketCode }}
              <Icon name="octicon:copy-16" width="0.75rem" height="0.75rem" />
            </span>
          </UButton>
        </div>
      </div>
      <div class="mt-2">
        <div>
          <span>{{ $t('name') }}: </span>{{ ticket.name || '-' }}
        </div>
        <div>
          <span>{{ $t('email') }}: </span>{{ ticket.email || '-' }}
        </div>
        <div>
          <span>{{ $t('phone_number') }}: </span>{{ ticket.phoneNumber || '-' }}
        </div>
        <div>
          <span>{{ $t('distance')
            }}: </span>{{ ticket.challengeDistance?.distance ? (ticket.challengeDistance?.distance / 1000) + 'km' : '-'
          }}
        </div>
      </div>
      <div class="mt-2">
        <div class="text-primary">
          <div v-if="!ticket.isPaid">
            <UButton :label="$t('pay')" :to="redirectUrl" color="gray" />
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>