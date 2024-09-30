import ticketRepository from '~/repository/ticket.repository'
import type { TicketDto, TicketGroupDto } from '~/types/dto/ticket.dto'

export const useTicket = () => {
  const listGroupTicket = ref<TicketGroupDto[]>()
  const isLoadingGroupTicket = ref(false)
  const groupTicketPaging = ref({
    page: 1,
    size: 20,
    totalElement: 0,
    totalPages: 1
  })

  const groupIdForTicket = ref(0)
  const listTicketOfGroup = ref<TicketDto[]>([])
  const isLoadingTicketOfGroup = ref(false)
  const ticketOfGroupPaging = ref({
    page: 1,
    size: 20,
    totalElement: 0,
    totalPages: 1
  })

  const listIndividualTicket = ref<TicketDto[]>([])
  const isLoadingIndividualTicket = ref(false)
  const individualTicketPaging = ref({
    page: 1,
    size: 20,
    totalElement: 0,
    totalPages: 1
  })

  const fetchGroupTicket = async ({ page, size }: { page: number, size: number }) => {
    if (page) {
      groupTicketPaging.value.page = page
    }

    if (size) {
      groupTicketPaging.value.size = size
    }

    const params = { page: groupTicketPaging.value.page, size: groupTicketPaging.value.size }
    isLoadingGroupTicket.value = true
    const { data, error } = await ticketRepository.fetchGroupTicket(params)

    if (data) {
      listGroupTicket.value = data.data
      groupTicketPaging.value.page = data.page
      groupTicketPaging.value.size = data.size
      groupTicketPaging.value.totalElement = data.totalElement
      groupTicketPaging.value.totalPages = data.totalPages
    }
    isLoadingGroupTicket.value = false
  }

  const fetchTicketOfGroup = async ({ page, size }: { page: number, size: number }) => {
    if (page) {
      ticketOfGroupPaging.value.page = page
    }

    if (size) {
      ticketOfGroupPaging.value.size = size
    }

    const params = { page: ticketOfGroupPaging.value.page, size: ticketOfGroupPaging.value.size }
    isLoadingTicketOfGroup.value = true
    const groupId = groupIdForTicket.value
    const { data, error } = await ticketRepository.fetchTicketOfGroup(groupId, params)

    if (data) {
      listTicketOfGroup.value = data.data
      ticketOfGroupPaging.value.page = data.page
      ticketOfGroupPaging.value.size = data.size
      ticketOfGroupPaging.value.totalElement = data.totalElement
      ticketOfGroupPaging.value.totalPages = data.totalPages
    }
    isLoadingTicketOfGroup.value = false
  }

  const fetchIndividualTicket = async ({ page, size }: { page: number, size: number }) => {
    if (page) {
      individualTicketPaging.value.page = page
    }

    if (size) {
      individualTicketPaging.value.size = size
    }

    const params = { page: individualTicketPaging.value.page, size: individualTicketPaging.value.size }
    isLoadingGroupTicket.value = true
    const { data, error } = await ticketRepository.fetchIndividualTicket(params)

    if (data) {
      listIndividualTicket.value = data.data
      individualTicketPaging.value.page = data.page
      individualTicketPaging.value.size = data.size
      individualTicketPaging.value.totalElement = data.totalElement
      individualTicketPaging.value.totalPages = data.totalPages
    }
    isLoadingIndividualTicket.value = false
  }

  return {
    listGroupTicket,
    isLoadingGroupTicket,
    groupTicketPaging,
    groupIdForTicket,
    listTicketOfGroup,
    isLoadingTicketOfGroup,
    ticketOfGroupPaging,
    listIndividualTicket,
    individualTicketPaging,
    isLoadingIndividualTicket,
    fetchGroupTicket,
    fetchTicketOfGroup,
    fetchIndividualTicket
  }
}