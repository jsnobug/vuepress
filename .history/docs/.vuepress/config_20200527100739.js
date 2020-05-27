module.exports = {
  title: 'Tenet Blog',
  description: 'Just learn javascript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'github', link: 'https://github.com/jsnobug' },
    ],
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        children: [ /* ... */ ]
      }
    ],
    displayAllHeaders: false
  }
}