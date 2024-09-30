<script setup lang="ts">
import { useArticle } from '~/composable/useArticle'

definePageMeta({
  middleware: ['authentication']
})

const { articlePaging, isLoadingArticle, listArticle, fetchArticle } = useArticle()

const paging = ref({
  page: 1,
  size: 9,
  totalPages: 1,
  totalElement: 0
})

const isFirstInit = ref(false)

const fetchData = async () => {
  const pagingParam = { page: paging.value.page, size: paging.value.size }
  await fetchArticle(pagingParam)
  const { size, page, totalPages, totalElement } = articlePaging.value
  paging.value.totalPages = totalPages
  paging.value.totalElement = totalElement
}

const init = async () => {
  await fetchData()
  isFirstInit.value = true
}

init()

watch(
  () => paging.value.page,
  (newVal) => {
    if (newVal) {
      // individualTicketPaging.value.page = newVal
      fetchData()
    }
  }
)
</script>
<template>
  <UContainer class="pt-10 flex flex-col gap-8">
    <div v-show="isFirstInit">
      <div v-if="listArticle?.length">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
          <div v-for="item in listArticle" class="col-span-1">
            <ArticleCard :article="item" @reload="fetchData(1)"/>
          </div>
        </div>
        <div class="flex items-center justify-end mt-4">
          <UPagination
            v-model="paging.page"
            :page-count="paging.size"
            :total="paging.totalElement"
            :active-button="{ class: 'bg-primary-500' }"
          />
        </div>
      </div>
      <div v-else>
        <h1 class="text-3xl flex items-center justify-center text-gray-700 mt-20 gap-2"><UIcon name="i-heroicons-circle-stack-20-solid"/> {{$t('no_article')}}</h1>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
p {
  min-height: 1.5rem;
}
</style>
