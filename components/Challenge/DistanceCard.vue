<template>
  <div class="flex gap-1 p-1 pr-4 justify-start items-center bg-[#222428] text-white rounded-3xl font-semibold">
    <div class="flex items-center justify-center p-1 bg-white rounded-full">
      <Icon name="carbon:running" width="1.25rem" height="1.25rem" class="text-[#222428]"/>
    </div>
    <span>{{ distance.distance / 1000 }}km</span>
    -
    <span>{{ $t('running_tag') }}</span>
  </div>
</template>
<script setup lang="ts">
import {type ChallengeDistance} from "../../types/dto/challenge.dto";

interface IPaymentDialogProps {
  distance: ChallengeDistance
}

const props = withDefaults(defineProps<IPaymentDialogProps>(), {
  distance: {
    id: 0,
    distance: 0,
    quantity: 0,
    challengeId: 0
  }
})


</script>