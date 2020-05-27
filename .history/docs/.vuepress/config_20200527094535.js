module.exports = {
  title: 'Tenet Blog',
  description: 'Just learn javascript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'github', link: 'https://github.com/jsnobug' },
    ],
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}