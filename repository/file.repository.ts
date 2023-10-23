import { FIleUploadDto } from './../types/dto/file.dto';

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const accessTokenCookie = useCookie("access-token");

export default {
  async upload(body: FIleUploadDto): Promise<string | null> {
    const url = `${BASE_URL}/file/upload`;
    const { data } = await useFetch<string>(url, {
      method: "post",
      body,
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    });
    return data.value;
  },
};
