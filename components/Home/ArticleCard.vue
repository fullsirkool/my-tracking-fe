<script setup lang="ts">
import {type Article} from '~/types/dto/article.dto'

const dayjs = useDayjs()

interface IArticleCardProps {
  article: Article,
  customClass?: string,
}

const props = withDefaults(defineProps<IArticleCardProps>(), {})

const getDisplayDate = computed(() => {
  const {createdAt} = props.article
  return `${dayjs(createdAt).tz('Asia/Bangkok').format('DD MMMM YYYY')}`
})
</script>
<template>
  <div
      class="z-10 rounded-lg bg-white text-[#4B4B4B] relative group hover:bg-primary-50 transition-all shadow-none hover:-translate-y-2 duration-300 hover:shadow-xl md:scale-30 hover:scale-60"
  >
    <div class="news-detail">
      <div class="rounded-lg news-image">
        <img
            :src="article.backgroundUrl"
            class="news-images rounded-lg min-h-[135px] h-full object-cover opacity-90 group-hover:opacity-100 object-[50%_0%]"
        />
      </div>
      <div class="px-4 py-2 text-left col-span-2">
        <div>
          <div>
            <div class="line-clamp-2">
              <NuxtLink
                  :to="`/article/${article.id}`"
                  class="font-bold text-xl hover:text-primary-500 transition-colors duration-300"
              >
                {{ article.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
<!--        <div v-if="article?.content">-->
<!--          <div v-html="article.content" class="h-[100px] news-content overflow-hidden"/>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<style>
.news-detail{
  height: 100%;
  padding: 15px;
  border-radius: 24px;
  background-color: #F5F5F5;
  transition: all .2s ease-in-out;
  -webkit-transition: all .2s ease-in-out;
}
</style>