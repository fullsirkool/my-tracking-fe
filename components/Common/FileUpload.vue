<template>
  <div class="w-fit">
    <div v-if="type === 'OTHER'">
      <div @click="open">
        <slot name="default">
        </slot>
        <input
          ref="mediaRef"
          name="media"
          accept="image/*"
          type="file"
          class="hidden"
          :disabled="readonly"
          tabindex="-1"
          @change="(e) => onChange(e)"
        />
      </div>
    </div>
    <div v-else
      class="upload-box text-center p-8 flex justify-center items-center relative border-2 border-dashed border-[#4B4B4B]"
      :class="{
      'rounded-full': circle,
      'rounded-lg': !circle,
      'pointer-events-none border-[#A0A0A0]': readonly,
    }"
      :style="{ width: `${width}px`, height: `${height}px` }"
    >
<!--      <UButton-->
<!--        icon="i-heroicons-x-circle"-->
<!--        size="lg"-->
<!--        color="gray"-->
<!--        variant="soft"-->
<!--        class="absolute z-[1000] top-2 right-2 rounded-full p-0 close-icon"-->
<!--        @click="clearState"-->
<!--      />-->
      <div @dragover.prevent="dragOver"
           @dragleave.prevent="dragLeave"
           @drop.prevent="drop($event)"
           @click="open">
        <div
          class="preview-image"
          :class="{
        'bg-gray': previewURL,
        'rounded-full': circle,
        'rounded-lg': !circle,
      }"
          :style="previewStyle"
        >
          <img
            v-show="previewURL"
            :src="previewURL"
            alt=""
            :class="{ 'rounded-full': circle, 'rounded-lg': !circle }"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <div></div>
          <input
            ref="mediaRef"
            name="media"
            accept="image/*"
            type="file"
            class="hidden"
            :disabled="readonly"
            tabindex="-1"
            @change="(e) => onChange(e)"
          />
          <img
            v-if="!readonly || !defaultUrl"
            class="select-image"
            src="~/assets/icon/default-image.svg"
            alt=""
            :class="{ 'rounded-full': circle, 'rounded-lg': !circle }"
          />
          <img
            v-else-if="defaultUrl"
            class="select-image"
            :src="defaultUrl"
            alt=""
            :class="{ 'rounded-full': circle, 'rounded-lg': !circle }"
          />

        </div>
      </div>
    </div>
    <div v-if="warningMessage" class="text-center w-full p-2">{{ warningMessage }}</div>
  </div>
</template>

<script setup lang="ts">
enum UploadFileType {
  PREVIEW = 'PREVIEW',
  OTHER = 'OTHER'
}
interface IFileUploadProps {
  width?: number
  height?: number
  circle?: boolean
  defaultImage?: string
  readonly?: boolean
  defaultUrl?: string
  warningMessage?: string,
  type: UploadFileType
}

const props = withDefaults(defineProps<IFileUploadProps>(), {
  circle: false,
  defaultImage: '',
  readonly: false,
  defaultUrl: '',
  warningMessage: '',
  type: UploadFileType.PREVIEW
})

const emit = defineEmits<{
  (e: 'update:model-value', value: File): void
}>()

const mediaRef = ref<HTMLInputElement>()
const previewURL = ref<string>('')
const selectedFile = ref<File | null>(null)

const previewStyle = computed(() => {
  return {}
})

const dragOver = () => {
}
const dragLeave = () => {
}
const drop = (e: DragEvent) => {
  const files = e?.dataTransfer?.files
  const file = files?.[0]
  if (file) {
    selectedFile.value = file
    getFileUrl(file)
    emit('update:model-value', file)
  }
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    const file = target.files?.[0]
    if (file) {
      selectedFile.value = file
      getFileUrl(file)
      emit('update:model-value', file)
    }
  }
}

const getFileUrl = (file: File) => {
  const theReader = new FileReader()
  theReader.onloadend = async () => {
    const readValue = await theReader.result
    if (typeof readValue === 'string') {
      previewURL.value = readValue
    }
  }
  theReader.readAsDataURL(file)
}

const open = () => {
  mediaRef.value?.click()
}

const clearState = () => {
  if (selectedFile.value) {
    previewURL.value = ''
    selectedFile.value = null
    emit('update:model-value', null)
    // previewURL.value = props.defaultImage
  }
}

watch(() => props.defaultImage, (newVal) => {
  console.log('watch defaultImage', newVal)
  previewURL.value = newVal
})

onMounted(() => {
  previewURL.value = props.defaultImage
  console.log('previewURL.value', previewURL.value)
})
</script>

<style scoped>
.upload-box {
  .preview-image {
    position: absolute;
    border-radius: 12px;
    width: 98%;
    height: 98%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .preview-image:hover {
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
}

.select-image {
  width: 60%;
}
.close-icon {
  display: none;
}
.upload-box:hover {
  .close-icon {
    display: flex;
  }
}
</style>
