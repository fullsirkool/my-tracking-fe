<script setup lang="ts">
import {type Article} from "~/types/dto/article.dto";

interface IHomeChallengeList {
  articles: Article[]
}

const props = withDefaults(defineProps<IHomeChallengeList>(), {})
</script>
<template>
  <div class="bg-[#F5F5F5] p-10 text-gray-700 min-h-[700px]">
    <UContainer>
      <h1 class="font-bold uppercase text-center text-4xl">{{ $t('warm_feet_activity') }}</h1>
      <div>
        <div class="mt-10 news-list">
          <HomeArticleCard v-for="article in articles" :article="article" class="news-item"/>
        </div>
      </div>
      <div class="flex items-center justify-end py-6">
        <UButton :ui="{ rounded: 'rounded-full', border: 'none' }" size="xl" color="white"
                 icon="i-heroicons-arrow-right-circle-16-solid" :to="`/article`">
          {{ $t('view_all') }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
<style lang="scss">
.news-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 15px;
  position: relative;
}

.news-item > div {
  height: 100%;
  padding: 15px;
  border-radius: 24px;
  background-color: #fff;
  transition: all .2s ease-in-out;
  -webkit-transition: all .2s ease-in-out;
}

@media (max-width: 767px) {
  .news-list {
    justify-content: space-around;
    .news-item {
      margin-bottom: 5px;
      > div {
        border-radius: 14px;
        padding: 10px;
      }
    }
  }
}

@media (min-width: 768px) {
  .news-list {
    padding-left: 50%;
    flex-direction: column;
    height: fit-content;
    .news-item:not(:first-child) {
      .news-detail {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 10px;
        .news-images {
          grid-column: span 1 / span 1;
        }
        .news-content {
          grid-column: span 2 / span 2;
        }
      }
    }
    .news-item:first-child {
      position: absolute;
      left: 0;
      width: calc(50% - 15px);
      height: 100%;
      .news-detail {
        height: fit-content;
        .news-content {
          height: 70px;
        }
      }
    }
  }
}
</style>