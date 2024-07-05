// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/main.scss'],
  components: { global: true, dirs: ['~/components'] },
  app: {
    head: {
      title: 'Warm Feet',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: [
    '@nuxt/ui',
    'dayjs-nuxt',
    '@pinia/nuxt',
    'nuxt-lodash',
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/i18n',
    'nuxt-icon',
    'vue3-carousel-nuxt',
    'nuxt-vuefire',
    "nuxt-tiptap-editor",
  ],
  tiptap: {
    prefix: "Tiptap",
  },
  colorMode: {
    preference: 'light',
  },
  postcss: {
    plugins: {
      'postcss-custom-properties': false,
    },
  },
  i18n: {
    /* module options */
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      // {
      //   code: 'en-US',
      //   iso: 'en-US',
      //   name: 'English(US)',
      //   file: 'en-US.json',
      // },
      {
        code: 'vi-VN',
        iso: 'vi-VN',
        name: 'Tiếng Việt',
        file: 'vi-VN.json',
      },
    ],
    defaultLocale: 'vi-VN',
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      // there could be other properties depending on the project
    },
  },
  runtimeConfig: {
    public: {
      STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      STRAVA_BASE_URL: process.env.STRAVA_BASE_URL,
      STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      BASE_URL: process.env.BASE_URL,
      BASE_REDIRECT_URL: process.env.BASE_REDIRECT_URL,
      STRAVA_REDIRECT_URL: process.env.STRAVA_REDIRECT_URL,
    },
  },
})