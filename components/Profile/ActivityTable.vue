<template>
  <div class="mt-10">
    <div v-show="activitiesDetail?.length">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="activity in activitiesDetail" class="grid-span-1">
          <ActivityDetailCard :activity="activity">
          </ActivityDetailCard>
        </div>
      </div>
      <div class="flex items-center justify-end mt-4">
        <UPagination v-model="detailPage" :page-count="detailSize" :total="totalActivities"
          :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }">
        </UPagination>
      </div>
    </div>
    <div v-show="!activitiesDetail?.length" class="mx-0 mt-32 min-h-[200px] w-full text-center">
      <div>
        {{ $t('no_activities_in_this_month') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProfileStore } from '~/stores/profile.store';

const profileStore = useProfileStore();
const { activitiesDetail, totalActivities, detailPage, detailSize } = storeToRefs(profileStore);
</script>