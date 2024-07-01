import {FileType} from "~/types/enum/file.enum";

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async upload(file: File, fileType: FileType): Promise<string | null> {
    const url = `${BASE_URL}/file/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', fileType)
    const { data } = await useFetch<string>(url, {
      method: 'post',
      body: formData,
    })
    return data.value
  },
}
