const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export default {
  async upload(file: File): Promise<string | null> {
    const url = `${BASE_URL}/file/upload`;
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await useFetch<string>(url, {
      method: "post",
      body: formData,
    });
    return data.value;
  },
};
