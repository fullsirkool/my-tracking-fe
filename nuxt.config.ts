// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: { enabled: true },
  modules: ["@nuxt/ui"],
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
