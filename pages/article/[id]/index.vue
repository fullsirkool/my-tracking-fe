<script setup lang="ts">
import {useArticle} from '~/composable/useArticle'
import {useAdminStore} from '~/stores/admin.store'
import articleRepository from '~/repository/article.repository'

definePageMeta({
  layout: "article",
  middleware: ['authentication']
})

const dayjs = useDayjs()
const {params} = useRoute()
const {id} = params
const toast = useToast()
const {t} = useI18n()

const adminStore = useAdminStore()

const {
  articleDetail,
  fetchDetail
} = useArticle()


const getDisplayDate = computed(() => {
  if (!articleDetail?.value) {
    return ''
  }
  const {createdAt} = articleDetail.value
  return `${dayjs(createdAt).tz('Asia/Bangkok').format('YYYY, DD MMMM ')}`
})

const init = () => {
  fetchDetail(+id)
}

init()
</script>
<template>
  <div class="bg-gray-100 min-h-[100vh]">
    <UContainer>
      <div class="text-gray-700 grid grid-cols-12 min-h-[75vh] h-fit py-4 bg-white">
        <div class="col-span-10 col-start-2 md:col-span-8 md:col-start-3">
          <div>
            <div class="my-4">
              <h1 class="font-bold text-4xl">{{ articleDetail?.title }}</h1>
            </div>
            <div class="my-2 text-end text-gray-500">
              <p>{{ getDisplayDate }}</p>
            </div>
            <div v-if="articleDetail?.content" class="mt-4 article-content">
              <div v-html="articleDetail.content"/>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
<style lang="scss">
.article-content {
  a {
    display: inline-block;
    color: red;
    max-width: 75vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>