<script setup lang="ts">
import type { TicketGroupDto } from '~/types/dto/ticket.dto'
import { PaymentStatus } from '~/types/dto/payment.dto'

interface ITicketCardProps {
  ticket: TicketGroupDto
}

const dayjs = useDayjs()
const props = withDefaults(defineProps<ITicketCardProps>(), {})
const ticket = computed(() => props.ticket)
</script>
<template>
  <div
    class="mb-2.5 border bg-white border-slate-200 p-4 rounded-xl text-left"
  >
    <div>
      <div>
        <div class="font-semibold text-lg">
          <ProfileTicketDialog v-if="ticket.payment.status === PaymentStatus.COMPLETED" :group-id="ticket.id">
            <span class="text-lg">{{ ticket.challenge.title }}</span>
          </ProfileTicketDialog>
          <span v-else>{{ ticket.challenge.title }}</span>
        </div>
        <div>
          <span v-if="ticket.payment.status === PaymentStatus.PENDING" class="text-red-500">{{$t('not_paid')}}</span>
          <span v-else-if="ticket.payment.status === PaymentStatus.COMPLETED" class="text-green-500">{{$t('completed')}}</span>
          <span v-else-if="ticket.payment.status === PaymentStatus.REJECTED" class="text-red-500">{{$t('rejected')}}</span>
        </div>
      </div>
      <div class="mt-2">
        <div>
          <span>{{ $t('number_of_player') }}: </span>{{ ticket._count.challengePlayers || '-' }}
        </div>
        <div>
          <span>{{ $t('created_at') }}: </span>{{ dayjs(ticket.payment.createdAt).format('HH:mm DD-MM-YYYY') || '-' }}
        </div>
      </div>
      <div class="mt-2">
        <div class="text-primary">
          <div v-if="ticket.payment.status === PaymentStatus.PENDING" class="text-center">
            <UButton :label="$t('pay')" :to="`/ticket/group/edit/${ticket.id}`" color="gray" />
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>