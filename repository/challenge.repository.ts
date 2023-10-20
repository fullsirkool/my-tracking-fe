import { Challenge, CreateChallengeDto } from "~/types/dto/challenge.dto";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const accessTokenCookie = useCookie("access-token");

export default {
  async createChallenge(body: CreateChallengeDto): Promise<Challenge | null> {
    const url = `${BASE_URL}/challenge`;
    const { data } = await useFetch<Challenge>(url, {
      method: "post",
      body,
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    });
    return data.value;
  },
};
