export { Image } from "@tiptap/extension-image";
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      tiptapImage: Image
    }
  }
});