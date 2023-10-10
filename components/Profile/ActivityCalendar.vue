<template>
  <UCard class="rounded-2xl bg-[#f5f5f5] h-[400px]">
    <div class="flex items-center justify-center gap-4 pb-4">
      <UButton
        icon="i-heroicons-chevron-left"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        color="white"
        variant="solid"
        @click="handleChangeMonth('-')"
      />
      <h2 class="font-bold">{{ getMonthDisplay }}</h2>
      <UButton
        icon="i-heroicons-chevron-right"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        color="white"
        variant="solid"
        @click="handleChangeMonth('+')"
      />
    </div>
    <div class="grid grid-cols-7 text-center">
      <div v-for="day in daysInWeek" class="font-bold h-14">{{ day }}</div>
      <div v-for="item in getBlocks" class="h-10 flex items-center justify-center">
        <div v-if="item">
          <span v-if="!item.hasActivities">{{ item.title }}</span>
          <UPopover v-else mode="hover">
            <div class="w-fit h-fit rounded-full bg-[#FEBC04] p-2">
              <img src="~/assets/icon/icon_run.png" alt="" class="h-4 w-4" />
            </div>
            <template #panel>
              <div class="py-2 px-3">Distance: {{ item.distance }}km</div>
            </template>
          </UPopover>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile.store";
const dayjs = useDayjs();

//STORE//

const profileStore = useProfileStore();
const { handleChangeMonth } = profileStore;
const { chartDate, activities } = storeToRefs(profileStore);

//END STORE//

const daysInWeek = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

const numberOfWeeks = computed(() => munberOfWeeksInMonth(chartDate.value));

const getBlocks = computed(() => {
  if (numberOfWeeks.value === 4) {
    return Array.from({ length: 28 }, (_, index) => ({
      title: index + 1,
    }));
  }

  const firstDay = new Date(
    chartDate.value.getFullYear(),
    chartDate.value.getMonth(),
    1
  ).getDay();
  const lastDay = new Date(
    chartDate.value.getFullYear(),
    chartDate.value.getMonth() + 1,
    0
  ).getDay();

  let count = 0;
  const cloneActivities = [...activities.value];

  return Array.from({ length: numberOfWeeks.value * 7 }, (_, index) => {
    if (index < firstDay) {
      return {};
    }

    if (index > numberOfWeeks.value * 7 - 7 + lastDay) {
      return {};
    }

    if (!cloneActivities.length) {
      return {
        title: ++count,
        hasActivities: false,
      };
    }

    if (new Date(`${cloneActivities[0].startdate}`).getDate() !== count + 1) {
      return {
        title: ++count,
        hasActivities: false,
      };
    }

    const item = cloneActivities.shift();

    return {
      title: ++count,
      hasActivities: true,
      distance: (item.distance / 1000).toFixed(2),
    };
  });
});
const getMonthDisplay = computed(() => {
  return `Tháng ${dayjs(chartDate.value).format("MM/YYYY")}`;
});
</script>
