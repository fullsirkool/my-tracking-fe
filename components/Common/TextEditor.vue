<template>
  <div class="shadow-md editor">
    <div
      v-if="editor"
      class="te-bar flex flex-wrap gap-1 border border-slate-100 rounded-tl-xl rounded-tr-xl p-1 justify-center py-4 border-b-[1px]"
    >
      <div>
        <UButton
          :variant="editor.isActive('insert') ? 'outline' : 'ghost'"
          :disabled="!editor.can().chain().toggleBold().run()"
          @click="onClickToolkit('insert')"
        >
          <Icon name="mdi:cloud-upload" width="20" height="20" />
          Insert
        </UButton>
        <input
          accept="image/*"
          type="file"
          class="hidden"
          ref="fileRef"
          multiple
          @change="(e) => handleFileUpload(e)"
        />
      </div>

      <UButton
        :variant="editor.isActive('bold') ? 'outline' : 'ghost'"
        :disabled="!editor.can().chain().toggleBold().run()"
        @click="onClickToolkit('bold')"
      >
        <Icon name="mdi:format-bold" width="20" height="20" />
      </UButton>

      <UButton
        :variant="editor.isActive('italic') ? 'outline' : 'ghost'"
        :disabled="!editor.can().chain().toggleItalic().run()"
        @click="onClickToolkit('italic')"
      >
        <Icon name="mdi:format-italic" width="20" height="20" />
      </UButton>

      <UButton
        :disabled="!editor.can().chain().toggleStrike().run()"
        :variant="editor.isActive('strike') ? 'outline' : 'ghost'"
        @click="onClickToolkit('strike')"
      >
        <Icon name="ic:baseline-strikethrough-s" width="20" height="20" />
      </UButton>

      <UButton
        :variant="editor.isActive('paragraph') ? 'outline' : 'ghost'"
        @click="onClickToolkit('paragraph')"
      >
        <Icon name="mdi:format-paragraph" width="20" height="20" />
      </UButton>

      <UButton
        :variant="
          editor.isActive('heading', { level: 1 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 1 })"
      >
        <Icon name="gravity-ui:heading-1" width="20" height="20" />
      </UButton>

      <UButton
        :variant="
          editor.isActive('heading', { level: 2 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 2 })"
      >
        <Icon name="gravity-ui:heading-2" width="20" height="20" />
      </UButton>
      <UButton
        :variant="
          editor.isActive('heading', { level: 3 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 3 })"
      >
        <Icon name="gravity-ui:heading-3" width="20" height="20" />
      </UButton>
      <UButton
        :variant="
          editor.isActive('heading', { level: 4 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 4 })"
      >
        <Icon name="gravity-ui:heading-4" width="20" height="20" />
      </UButton>

      <UButton
        :variant="
          editor.isActive('heading', { level: 5 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 5 })"
      >
        <Icon name="gravity-ui:heading-5" width="20" height="20" />
      </UButton>

      <UButton
        :variant="
          editor.isActive('heading', { level: 6 }) ? 'outline' : 'ghost'
        "
        @click="onClickToolkit('heading', { level: 6 })"
      >
        <Icon name="gravity-ui:heading-6" width="20" height="20" />
      </UButton>

      <UButton
        :variant="editor.isActive('bulletList') ? 'outline' : 'ghost'"
        @click="onClickToolkit('bulletList')"
      >
        <Icon name="mdi:format-list-bulleted" width="20" height="20" />
      </UButton>

      <UButton
        :variant="editor.isActive('orderedList') ? 'outline' : 'ghost'"
        @click="onClickToolkit('orderedList')"
      >
        <Icon name="mdi:format-list-numbers" width="20" height="20" />
      </UButton>

      <UButton
        :variant="editor.isActive({ textAlign: 'left' }) ? 'outline' : 'ghost'"
        @click="onClickToolkit('alignLeft')"
      >
        <Icon name="mdi:format-align-left" width="20" height="20" />
      </UButton>
      <UButton
        :variant="editor.isActive({ textAlign: 'center' }) ? 'outline' : 'ghost'"
        @click="onClickToolkit('alignCenter')"
      >
        <Icon name="mdi:format-align-center" width="20" height="20" />
      </UButton>
      <UButton
        :variant="editor.isActive({ textAlign: 'right' }) ? 'outline' : 'ghost'"
        @click="onClickToolkit('alignRight')"
      >
        <Icon name="mdi:format-align-right" width="20" height="20" />
      </UButton>
      <UButton
        :variant="editor.isActive({ textAlign: 'justify' }) ? 'outline' : 'ghost'"
        @click="onClickToolkit('alignJustify')"
      >
        <Icon name="mdi:format-align-justify" width="20" height="20" />
      </UButton>
    </div>
    <TiptapEditorContent
      :editor="editor"
      :aria-rowcount="10"
      class="custom-tiptap"
    />
  </div>
</template>

<script setup>
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import TextAlign from '@tiptap/extension-text-align'
import Paragraph from '@tiptap/extension-paragraph'
import { HardBreak } from '@tiptap/extension-hard-break'
import fileRepository from '~/repository/file.repository'
import { FileType } from '~/types/enum/file.enum'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:model-value'])


const editor = useEditor({
  resizable: true,
  extensions: [
    Paragraph,
    HardBreak,
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: 'https',
      linkOnPaste: true
    }),
    TiptapStarterKit,
    Image.configure({
      inline: true, // Render image inline
      allowBase64: true, // Allow base64 encoded images
      HTMLAttributes: {
        class: '' // Add custom class
      }
    }),
    ImageResize,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    })
  ]
})

const fileRef = ref()
const tempFile = ref(null)

const uploadImage = async () => {
  const urls = await fileRepository.uploadMultiple(tempFile.value, FileType.ARTICLE_IMAGE)
  if (urls) {
    urls.forEach(url => {
      editor.value.commands.insertContent([
        {
          type: 'image',
          attrs: { src: url }
        },
        {
          type: 'paragraph' // Insert a paragraph after the image
        }
      ])
      editor.value.commands.enter()
    })
    tempFile.value = null
  }
}

const onClickToolkit = (key, options) => {
  const { anchor, from, to } = editor.value.state.selection
  const text = editor.value.state.doc.textBetween(from, to, ' ')

  switch (key) {
    case 'insert':
      // uploadImage()
      fileRef.value?.click()
      break
    case 'bold':
      text
        ? editor.value.chain().toggleBold().run()
        : editor.value.chain().focus().toggleBold().run()
      break

    case 'italic':
      text
        ? editor.value.chain().toggleItalic().run()
        : editor.value.chain().focus().toggleBold().run()
      break

    case 'strike':
      text
        ? editor.value.chain().toggleStrike().run()
        : editor.value.chain().focus().toggleStrike().run()
      break

    case 'code':
      text
        ? editor.value.chain().toggleCode().run()
        : editor.value.chain().focus().toggleCode().run()
      break

    case 'paragraph':
      text
        ? editor.value.chain().setParagraph().run()
        : editor.value.chain().focus().setParagraph().run()
      break

    case 'heading':
      text
        ? editor.value.chain().toggleHeading({ level: options.level }).run()
        : editor.value
          .chain()
          .focus()
          .toggleHeading({ level: options.level })
          .run()
      break

    case 'bulletList':
      text
        ? editor.value.chain().toggleBulletList().run()
        : editor.value.chain().focus().toggleBulletList().run()
      break

    case 'orderedList':
      text
        ? editor.value.chain().toggleOrderedList().run()
        : editor.value.chain().focus().toggleOrderedList().run()
      break

    case 'alignLeft':

      text
        ? editor.value.chain().setTextAlign('left').run()
        : editor.value.chain().focus().setTextAlign('left').run()
      break

    case 'alignCenter':
      text
        ? editor.value.chain().setTextAlign('center').run()
        : editor.value.chain().focus().setTextAlign('center').run()
      break

    case 'alignRight':
      text
        ? editor.value.chain().setTextAlign('right').run()
        : editor.value.chain().focus().setTextAlign('right').run()
      break

    case 'alignJustify':
      text
        ? editor.value.chain().setTextAlign('justify').run()
        : editor.value.chain().focus().setTextAlign('justify').run()
      break
    default:
      break
  }
  editor.value.chain().focus(anchor)
}

const handleFileUpload = (event) => {
  const target = event.target
  if (target) {
    const files = target.files
    tempFile.value = files
    uploadImage()
  }
}

onMounted(() => {
  if (!!unref(editor)) {
    unref(editor).commands.setContent(props.modelValue)
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    unref(editor).commands.setContent(newValue)
    unref(editor).getHTML()
  }
)

onBeforeUnmount(() => {
  unref(editor).destroy()
})

defineExpose({
  editor
})
</script>

<style scoped lang="scss">
:deep(.custom-tiptap) {
  & > div {
    min-height: 200px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 1.3;
    margin-left: 1rem;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.2;
    margin-left: 1rem;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1rem;
  }

  h5 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-left: 1rem;
  }

  h6 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-left: 1rem;
  }

  ul {
    padding-left: 1rem;
    margin-left: 1rem;
    list-style-type: disc;
  }

  ol {
    padding-left: 1rem;
    margin-left: 1rem;
    list-style-type: decimal;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  s {
    text-decoration: line-through;
  }

  p {
    margin-left: 1rem;
    margin-bottom: 0.25rem;
  }
}
</style>
