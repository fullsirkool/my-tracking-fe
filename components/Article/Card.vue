<script setup lang="ts">
import { type Article, type DeleteArticleDto } from '~/types/dto/article.dto'
import articleRepository from '~/repository/article.repository'
import { useAdminStore } from '~/stores/admin.store'

const dayjs = useDayjs()

interface IArticleCardProps {
  article: Article,
  customClass?: string,
}
const adminStore = useAdminStore()
const toast = useToast()
const {t} = useI18n()

const props = withDefaults(defineProps<IArticleCardProps>(), {})
const emit = defineEmits(['reload'])

const isOpenDeleteModal = ref(false)

const isAdmin = computed(() => adminStore.isSignedIn)

const getDisplayDate = computed(() => {
  const {createdAt} = props.article
  return `${dayjs(createdAt).tz('Asia/Bangkok').format('DD MMMM YYYY')}`
})

const handleEditArticle = () => {
  navigateTo(`/article/${props.article.id}/edit`)
}

const handleDeleteArticle = async () => {
  const payload: DeleteArticleDto = {id: props.article.id}
  const {data, error} = await articleRepository.delete(payload)
  if (error) {
    console.error(error)
    toast.add({
      id: 'delete-article',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message,
    })
    return
  }

  toast.add({
    id: 'delete-article',
    icon: 'i-heroicons-exclamation-circle',
    color: 'green',
    timeout: 4000,
    title: t('deleted_successfully'),
  })
  emit('reload')
}
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
      <UDivider v-if="isAdmin"/>
      <div v-if="isAdmin" class="flex items-center justify-center gap-4 pt-2">
        <UButton icon="i-heroicons-pencil" variant="link" size="xs" :label="$t('edit_article')" @click="handleEditArticle"/>
        <div>
          <UButton
            :label="$t('delete_article')"
            variant="link"
            size="xs"
            icon="i-heroicons-trash"
            @click="isOpenDeleteModal = true"
          />
          <UModal v-model="isOpenDeleteModal" :transition="false">
            <UCard>
              <div class="space-y-2 flex flex-col gap-4 text-center">
                <p>{{ $t('delete_article_question') }}</p>
                <div class="flex items-center justify-center gap-4">
                  <UButton
                    :label="$t('delete_article')"
                    size="md"
                    @click="handleDeleteArticle"
                  >
                  </UButton>
                  <UButton
                    :label="$t('cancel')"
                    size="md"
                    variant="outline"
                    @click="isOpenDeleteModal = false"
                  >
                  </UButton>
                </div>
              </div>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>
  </div>
</template>