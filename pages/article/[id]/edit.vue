<script setup lang="ts">

import articleRepository from '~/repository/article.repository'
import fileRepository from '~/repository/file.repository'
import { FileType } from '~/types/enum/file.enum'

definePageMeta({
  middleware: ["authentication"]
})

const { t } = useI18n()
const toast = useToast()
const { params } = useRoute()
const { id } = params

const state = ref({
  id: 0,
  title: '',
  description: '',
  backgroundUrl: ''
})

const backgroundFile = ref<File>(undefined)

const textEditor = ref<HTMLElement | null>(null)

const validate = (state: any) => {
  const errors = []
  const description = textEditor.value?.editor.getHTML()

  if (!state.title) {
    errors.push({ path: 'title', message: t('title_is_required_field') })
  }
  if (!description) {
    errors.push({ path: 'content', message: t('content_is_required_field') })
  }
  if (!backgroundFile) {
    errors.push({ path: 'background', message: t('background_is_required_field') })
  }
  return errors
}

const uploadImgage = async (file: File) => {
  if (file) {
    return await fileRepository.upload(file, FileType.ARTICLE_IMAGE)
  }
  return ''
}

const submit = async (event: any) => {
  if (textEditor.value?.editor.getHTML()) {
    state.value.description = textEditor.value.editor.getHTML()
  }
  const {id, title} = event.data

  let backgroundUrl = event.data.backgroundUrl

  if (backgroundFile.value) {
    backgroundUrl = await uploadImgage(backgroundFile.value)
  }

  const {data, error} = await articleRepository.update({id, title, content: state.value.description, backgroundUrl})

  if (error) {
    toast.add({
      id: 'create-article',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message
    })
    return
  }

  toast.add({
    id: 'create-article',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    color: 'green',
    title: t('create_article_success')
  })

  navigateTo('/article')
}

const init = async () => {
  const {data} = await articleRepository.fetchOne({id: +id})
  console.log('init', data);
  if (data) {
    const {title, content, backgroundUrl} = data
    state.value.id = data.id
    state.value.title = title
    state.value.description = content
    state.value.backgroundUrl = backgroundUrl || ''
  }

  console.log('after init', state.value);
}

useAsyncData(() => init())

watch(() => state.value.backgroundUrl, (newVal) => {
  console.log('set props.defaultImage', newVal)
})
</script>
<template>
  <UContainer class="flex flex-col gap-4">
    <h1 class="text-3xl text-center font-semibold">{{ $t('create_article') }}</h1>
    <UForm
      :validate="validate"
      :state="state"
      class="col-span-12 sm:col-span-8"
      @submit="submit"
    >
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="col-span-2">
          <UFormGroup :label="$t('title')" name="title" class="p-2" required>
            <UTextarea v-model="state.title" :rows="10"/>
          </UFormGroup>
        </div>
        <div class="col-span-1">
          <UFormGroup :label="$t('background')" name="background" class="p-2" required>
            <div class="hidden md:block">
              <CommonFileUpload
                v-model="backgroundFile"
                :warning-message="$t('upload_image_warning')"
                :width="377"
                :height="212"
                :default-image="state.backgroundUrl"
              />
            </div>
            <div class="block md:hidden">
              <CommonFileUpload
                v-model="backgroundFile"
                :warning-message="$t('upload_image_warning')"
                :width="318"
                :height="179"
                :default-image="state.backgroundUrl"
              />
            </div>

          </UFormGroup>
        </div>
      </div>
      <UFormGroup :label="$t('content')" name="content" class="p-2" required>
        <CommonTextEditor
          ref="textEditor"
          :model-value="state.description"
        />
      </UFormGroup>
      <div class="flex gap-4 items-center justify-center">
        <UButton size="xl" type="submit">
          {{ $t('edit_article') }}
        </UButton>
      </div>
    </UForm>
  </UContainer>
</template>
<style lang="scss">
.custom-tiptap {
  .tiptap {
    height: 700px;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #D6DADE;
    width: 8px;
    padding-right: 8px;
  }
}

.ProseMirror-focused {
  border: none;
  outline: none;
}
</style>