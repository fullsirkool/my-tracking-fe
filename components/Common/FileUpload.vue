<template>
  <div
    class="upload-box text-center p-8 flex justify-center items-center relative border-2 border-dashed border-[#4B4B4B]"
    :class="{
      'rounded-full': circle,
      'rounded-lg': !circle,
      'pointer-events-none border-[#A0A0A0]': disabled,
    }"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
    @click="open"
  >
    <div
      class="preview-image"
      :class="{
        'bg-gray': previewURL,
        'rounded-full': circle,
        'rounded-lg': !circle,
      }"
    >
      <img
        v-show="previewURL"
        :src="previewURL"
        alt=""
        :class="{ 'rounded-full': circle, 'rounded-lg': !circle }"
      />
    </div>
    <div class="flex items-center justify-center">
      <input
        ref="mediaRef"
        name="media"
        accept="image/*"
        type="file"
        class="hidden"
        :disabled="disabled"
        tabindex="-1"
        @change="(e) => onChange(e)"
      />
      <img
        class="select-image"
        src="~/assets/icon/default-image.svg"
        alt=""
        :class="{ 'rounded-full': circle, 'rounded-lg': !circle }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IFileUploadProps {
  width?: number
  height?: number
  circle?: boolean
  defaultImage?: string
  disabled?: boolean
  modelValue?: File | undefined
}

const props = withDefaults(defineProps<IFileUploadProps>(), {
  width: 300,
  height: 200,
  circle: false,
  defaultImage: '',
  disabled: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: 'update:model-value', value: File): void
}>()

const mediaRef = ref<HTMLInputElement>()
const previewURL = ref<string>('')

const dragOver = () => {}
const dragLeave = () => {}
const drop = (e: DragEvent) => {
  const files = e?.dataTransfer?.files
  const file = files?.[0]
  if (file) {
    getFileUrl(file)
    emit('update:model-value', file)
  }
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    const file = target.files?.[0]
    if (file) {
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

onMounted(() => {
  previewURL.value = props.defaultImage
})
</script>

<style scoped>
.upload-box {
  .preview-image {
    position: absolute;
    border-radius: 12px;
    width: 98%;
    height: 97%;
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
</style>
