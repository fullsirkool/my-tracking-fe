// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: true},
    pages: true,
    css: ['~/assets/main.scss'],
    components: {global: true, dirs: ['~/components']},
    app: {
        // pageTransition: { name: 'page', mode: 'out-in' },
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
    ],
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
            {
                code: 'en-US',
                iso: 'en-US',
                name: 'English(US)',
                file: 'en-US.json',
            },
            {
                code: 'vi-VN',
                iso: 'vi-VN',
                name: 'Tiếng Việt',
                file: 'vi-VN.json',
            },
        ],
        defaultLocale: 'en-US',
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
