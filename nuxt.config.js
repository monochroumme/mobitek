export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    env: {
        imagesUrl: 'https://admin.mobitek.az/storage' || 'http://localhost:3000',
        specImgUrl: 'https://admin.mobitek.az/' || 'http://localhost:3000'
    },

    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'UTF-8'},
            {name: "robots", content: "index, follow"},
            {name: "googlebot", content: "index, follow"},
            {property: "og:type", content: "website"},
            {name: "google-site-verification", content: "WV19gWivUf8nqWY7pKLX4sw7qnEniWZN3szX5h-kve0"},
            {'http-equiv': 'X-UA-Compatible', content: 'ie=edge'},
            {
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
            },
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            // Roboto font
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
            }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#FFCD26'},
    /*
    ** Global CSS
    */
    css: [{
        src: '~/assets/scss/app.scss',
        lang: 'scss'
    }],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/swiper',
        '~/plugins/bus',
        '~/plugins/components',
        {src: '~/plugins/scroll-lock', ssr: false},
        {src: '~/plugins/vue-backtotop', ssr: false}
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        [
            'nuxt-i18n',
            {
                noPrefixDefaultLocale: true,
                locales: [
                    {code: 'en', iso: 'en-US', file: 'en.json'},
                    {code: 'az', iso: 'az-AZ', file: 'az.json'},
                    {code: 'ru', iso: 'ru-RU', file: 'ru.json'}
                ],
                defaultLocale: 'en',
                vueI18n: {
                    fallbackLocale: 'en'
                },
                lazy: true,
                langDir: 'locales/'
            },
        ],
        '@nuxtjs/toast',
        '@nuxtjs/google-analytics',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots'
    ],
    googleAnalytics: {
        id: "UA-169616881-1"
    },
    sitemap: {
        hostname: "https://mobitek.az",
        gzip: true,
        exclude: ["/secret", "/admin/**"]
    },
  
    toast: {
        position: 'bottom-right',
        duration: 4000
    },
    /*
    ** Build configuration
    */
    build: {
        extend(config, {isDev, isClient}) {
        },
        extractCSS: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        }
    }
}
