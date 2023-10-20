import { ChallengeUtitlitiesDto } from "~/types/dto/challenge.dto";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export default {
  async fetchUtilities(): Promise<ChallengeUtitlitiesDto | null> {
    const url = `${BASE_URL}/challenge/utilities`;
    const { data } = await useFetch<ChallengeUtitlitiesDto>(url, {
      method: "get",
    });
    console.log("utilities", data.value);
    return data.value;
  }
}
