module.exports = {
  title: 'Tenet Blog',
  description: 'Just learn javascript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'github', link: 'https://github.com/jsnobug' },
    ],
    displayAllHeaders: true,
    sidebar: {
      '/javascript/': [
        '',
        'one'
      ]
    }
  }
}