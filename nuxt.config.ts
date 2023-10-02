// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  pages: true,
  css: ["~/assets/main.css"],
  components: { global: true, dirs: ["~/components"] },
  modules: ["@nuxt/ui", "dayjs-nuxt"],
  runtimeConfig: {
    public: {
      STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      STRAVA_BASE_URL: process.env.STRAVA_BASE_URL,
      STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      BASE_URL: process.env.BASE_URL,
      BASE_REDIRECT_URL: process.env.BASE_REDIRECT_URL,
    },
  },
});
