// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/style.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      STRAVA_BASE_URL: process.env.STRAVA_BASE_URL,
      STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      BASE_URL: process.env.BASE_URL,
    },
  },
});
