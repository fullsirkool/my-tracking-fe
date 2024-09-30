<script setup lang="ts">
import { Article } from '~/types/dto/article.dto'

interface IArticleSlider {
  articles: Article[]
}
const props = withDefaults(defineProps<IArticleSlider>(), {
  articles: []
})
</script>
<template>
  <carousel :autoplay="40000" :itemsToShow="2">
    <slide v-for="article in articles" :key="article.id" class="relative">
      <div class="block">
        <ArticleCard :article="article"></ArticleCard>
      </div>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>