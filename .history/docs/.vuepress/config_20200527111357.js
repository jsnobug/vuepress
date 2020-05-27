module.exports = {
  title: 'Tenet Blog', // 标题
  description: 'Just learn javascript', // 描述
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
    // 即 docs/.vuepress/public/img/geass-bg.ico
    ['link', { rel: 'icon', href: '/favicon.ico' }], 
  ],
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