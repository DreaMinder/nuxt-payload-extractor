module.exports = {
  head: {
    title: 'Demo',
    meta: [
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,700&amp;subset=cyrillic' }
    ],
  },
  modules: [
    '@nuxtjs/axios',
    ['@/../lib/module.js', {blacklist: ['/']}] //nuxt-payload-extractor dependency
  ],
  axios: {
    prefix: '/api'
  }
}
