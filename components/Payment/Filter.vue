<script setup lang="ts">
import DatePicker from '~/components/Common/DatePicker.vue'

type FilterPropsType = {}

const emit = defineEmits(['update:model-value'])
const props = withDefaults(defineProps<FilterPropsType>(), {
  modelValue: {
    challengeName: '',
    createdDate: undefined,
    query: '',
  },
})

const dayjs = useDayjs()
const { t } = useI18n()

const filterValue = reactive({
  query: '',
  createdDate: undefined,
  challengeName: '',
})

const challengeOptions = reactive({
  isCompleted: true,
  isNotCompleted: true,
})

const calendarLabel = computed(() => {
  return filterValue.createdDate
    ? dayjs(filterValue.createdDate).format('DD/MM/YYYY')
    : t('all_time')
})

const onFilter = () => {
  emit('update:model-value', filterValue)
}

const onKeydown = (event: KeyboardEvent) => {
  event.key == 'Enter' && onFilter()
}
</script>
<template>
  <div
    class="bg-white shadow rounded-xl flex flex-col md:flex-row md:items-end p-5 gap-5"
  >
    <div class="flex md:block gap-5 items-center">
      <label class="text-sm font-semibold">
        {{ t('start_date') }}
      </label>

      <div class="flex items-center gap-5">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="calendarLabel"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="filterValue.createdDate"
              is-required
              @close="close"
            >
              <template #footer>
                <div class="text-center mb-5 px-2.5">
                  <UButton
                    block
                    @click="
                      () => {
                        filterValue.createdDate = undefined
                        close()
                      }
                    "
                  >
                    {{ t('all_time') }}
                  </UButton>
                </div>
              </template>
            </DatePicker>
          </template>
        </UPopover>
      </div>
    </div>

    <div class="flex md:block gap-5 items-center">
      <label class="text-sm font-semibold">
        {{ t('challenge') }}
      </label>

      <div>
        <UPopover>
          <UButton
            color="white"
            label="Open"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />

          <template #panel>
            <div class="p-4">
              <UCheckbox
                v-model="challengeOptions.isNotCompleted"
                name="not-completed"
                :label="t('uncompleted')"
              />
              <UCheckbox
                v-model="challengeOptions.isCompleted"
                name="completed"
                :label="t('completed')"
              />
            </div>
            <UDivider />
            <div class="p-4">
              
            </div>
          </template>
        </UPopover>
      </div>
    </div>

    <div class="flex-1 flex items-end gap-5 w-100">
      <div class="flex-1">
        <label class="text-sm font-semibold" for="query">
          {{ t('search_by_keyword') }}
        </label>
        <UInput
          v-model="filterValue.query"
          placeholder="Keyword"
          name="query"
          @keydown="onKeydown"
        />
      </div>
      <UButton @click="onFilter"> {{ t('search') }} </UButton>
    </div>
  </div>
</template>
