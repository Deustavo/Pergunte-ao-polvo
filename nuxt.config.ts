// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Pergunte ao polvo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Se você estiver indeciso, pergunte ao polvo.' },
        { hid: 'description', name: 'description', content: 'Pergunte ao Polvo! Se precisar fazer uma escolha difícil, pergunte ao polvo! Ele saberá a resposta certa.' },
        { name: 'keywords', content: 'Pergunte ao Polvo, escolha difícil, decisão, diversão' },
        { name: 'author', content: 'deustavo' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css',
          integrity: 'sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
  modules: [
    "nuxt-vercel-analytics",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap"
  ],
  site: {
    url: 'https://pergunteaopolvo.com/',
    name: 'My Awesome Website'
  },
});