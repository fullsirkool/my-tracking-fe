<script lang="ts" setup>
import { ChallengeGroup } from '~/types/dto/challenge.dto'

const isOpen = defineModel<boolean>()
const emit = defineEmits(['select'])

interface ISelectGroupDialogProps {
  groups: ChallengeGroup[]
}

const colors = ['emerald', 'cyan', 'teal', 'violet']

const props = withDefaults(defineProps<ISelectGroupDialogProps>(), {})

const handleSelectGroup = (id: number) => {
  console.log('handleSelectGroup', id)
  emit('select', id)
}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="rounded-xl overflow-hidden">
      <div class="text-xl font-bold text-center uppercase tracking-wide p-5">
        {{ $t('choose_group') }}
      </div>
      <div class="flex justify-center max-w-md md:max-w-xl gap-8 p-8 flex-wrap">
        <UButton
          v-for="(item, index) in groups"
          :key="item.id"
          :color="colors[index]"
          :label="item.name"
          size="xl"
          variant="solid"
          @click="handleSelectGroup(item.id)"
        />
      </div>
    </div>
  </UModal>
</template>
