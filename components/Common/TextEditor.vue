<template>
  <div class="shadow-sm">
    <div
      v-if="editor"
      class="te-bar flex gap-1 border border-b-0 border-slate-100 rounded-tl-xl rounded-tr-xl p-1"
    >
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <Icon name="mdi:format-bold" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <Icon name="mdi:format-italic" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <Icon name="ic:baseline-strikethrough-s" width="20" height="20" />
      </UButton>
      <!-- <UButton variant="ghost"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </UButton> -->
      <!-- <UButton variant="ghost" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </UButton> -->
      <!-- <UButton variant="ghost" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </UButton> -->
      <UButton variant="ghost"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <Icon name="mdi:format-paragraph" width="20" height="20"/>
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        <Icon name="gravity-ui:heading-1" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        <Icon name="gravity-ui:heading-2" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <Icon name="gravity-ui:heading-3" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        <Icon name="gravity-ui:heading-4" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        <Icon name="gravity-ui:heading-5" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        <Icon name="gravity-ui:heading-6" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <Icon name="mdi:format-list-bulleted" width="20" height="20" />
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <Icon name="mdi:format-list-numbers" width="20" height="20" />
      </UButton>
      <!-- <UButton variant="ghost"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </UButton> -->
      <!-- <UButton variant="ghost"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </UButton> -->
      <!-- <UButton variant="ghost" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </UButton> -->
      <!-- <UButton variant="ghost" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </UButton> -->
      <!-- <UButton variant="ghost"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </UButton>
      <UButton variant="ghost"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </UButton> -->
    </div>
    <TiptapEditorContent :editor="editor" class="p-2.5" />
  </div>
</template>

<script setup>
// const modelValue = defineModel()
const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:model-value'])
const editor = useEditor({
  extensions: [TiptapStarterKit],
  onBlur: (event) => {
    console.log('event.editor.getText()', event.editor.getText())
    console.log('event.editor.getHTML()', event.editor.getHTML())
    console.log('event.editor.getJSON()', event.editor.getJSON())

    // emit('update:model-value', event.editor.getText())
    emit('update:model-value', event.editor.getHTML())
  },
})

onMounted(() => {
  if (!!unref(editor)) {
    unref(editor).commands.setContent(props.modelValue)
    // console.log(props.modelValue)
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    unref(editor).commands.setContent(newValue)
    unref(editor).getHTML()
  },
)

onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>

<style scoped lang="scss">
/* te: text-editor */
</style>
