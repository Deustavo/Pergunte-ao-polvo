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
        { name: 'description', content: 'Pergunte ao Polvo! Se precisar fazer uma escolha difícil, pergunte ao polvo! Ele saberá a resposta certa.' },
        { name: 'keywords', content: 'Pergunte ao Polvo, escolha difícil, decisão, diversão' },
        { name: 'author', content: 'deustavo' }
      ],
      script: [
        {
          innerHTML: '(function(){try{var t=localStorage.getItem("theme")||"light";document.documentElement.className=t+"-theme";}catch(e){}})();'
        }
      ],
      style: [
        {
          innerHTML: `
            html.dark-theme .floating-container .theme-button{background-color:#2a2a2a!important;border:2px solid #D63F8C!important;box-shadow:rgba(255,255,255,0.1) 0px 3px 6px,rgba(255,255,255,0.05) 0px 3px 6px!important}
            html.dark-theme .floating-container .theme-button:hover{background-color:#1a1a1a!important;border-color:#b61f6d!important}
            html.dark-theme .button{background-color:#1a1a1a!important;border:2px solid #D63F8C!important;color:#f1f1f1!important}
            html.dark-theme .button:hover{background-color:#2a2a2a!important;border-color:#b61f6d!important}
            html.dark-theme .button--outline{background-color:transparent!important;border:2px solid #D63F8C!important;color:#D63F8C!important}
            html.dark-theme .button--outline:hover{background-color:#1a1a1a!important;border-color:#D63F8C!important;color:#f1f1f1!important}
            html.dark-theme input{background-color:#2a2a2a!important;border:1px solid #404040!important;color:#f1f1f1!important}
            html.dark-theme input:focus{border-color:#D63F8C!important}
            html.dark-theme input::placeholder{color:#a0a0a0!important}
            html.dark-theme .app-result-selectedOption{background-color:#2a2a2a!important;color:#f1f1f1!important;border:1px solid #404040!important}
            html.dark-theme label{color:#f1f1f1!important}
            html.dark-theme .about-link{color:#ff69b4!important}
            html.dark-theme .about-link:hover{color:#D63F8C!important}
          `.replace(/\s+/g, ' ').trim()
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=optional',
        },
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
  ]
});