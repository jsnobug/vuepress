module.exports = {
  title: 'Tenet Blog',
  description: 'Just learn javascript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'github', link: 'https://github.com/jsnobug' },
    ],
    sidebar: {
      '/javascript': [{
        title: 'javascript',
        collapsable: false,
        children: [
          { title: 'text', path: '/javscript'},
          { title: 'one', path: '/one'}
        ]
      }]
    },
    displayAllHeaders: false
  }
}