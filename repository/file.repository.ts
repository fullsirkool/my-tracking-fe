import { FIleUploadDto } from "./../types/dto/file.dto";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const accessTokenCookie = useCookie("access-token");

export default {
  async upload(file: File): Promise<string | null> {
    const url = `${BASE_URL}/file/upload`;
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await useFetch<string>(url, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessTokenCookie.value}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data.value;
  },
};
