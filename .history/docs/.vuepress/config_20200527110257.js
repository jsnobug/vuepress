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
      '/javascript/': [{
        title: 'javascript',
        collapsable: false,
        children: [
          {title: 'javascript1', path: '/javascript/'},
          {title: 'javascript11', path: '/javascript/one'},
        ]
      }]
    }
  }
}