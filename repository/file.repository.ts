import {FileType} from "~/types/enum/file.enum";

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async upload(file: File, fileType: FileType): Promise<string | null> {
    const adminAccessTokenCookie = useCookie('x-access-token')
    if (!adminAccessTokenCookie.value) {
      navigateTo('/admin/signin')
    }
    const url = `${BASE_URL}/file/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', fileType)
    const { data } = await useFetch<string>(url, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${adminAccessTokenCookie.value}` },
    })
    return data.value
  },

  async uploadMultiple(files: File[], fileType: FileType): Promise<string[] | null> {
    const adminAccessTokenCookie = useCookie('x-access-token')
    if (!adminAccessTokenCookie.value) {
      navigateTo('/admin/signin')
    }
    const url = `${BASE_URL}/file/upload-multiple`
    const formData = new FormData()
    console.log('files', files)
    if (files) {
      for (const file of files) {
        formData.append('files', file)
      }
      formData.append('fileType', fileType)
      const { data } = await useFetch<string[]>(url, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${adminAccessTokenCookie.value}` },
      })
      return data.value
    }
    return null
  },
}
