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
    sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
    // 顶部导航栏
    nav: [
      // 单项 text：显示文字，link：指向链接
      // 这里的'/' 指的是 docs文件夹路径
      // [以 '/' 结尾的默认指向该路径下README.md文件]
      { text: 'Home', link: '/'},
      // 多项
      { 
        text: '联系我',
        items: [
          {text: 'github', link: 'https://github.com/jsnobug'},
          {text: 'gitee', link: 'https://gitee.com/xiao_zheng_123'},
        ]
      }  
    ],
    // 侧边栏菜单( 一个模块对应一个菜单形式 )
    sidebar: {
      '/javascript/': [
        // 多菜单形式
        {
          // 菜单名
          title: 'javascript',
          // 子菜单
          children: [
            // ['','']=>[路径,标题]
            // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
            // 不以 '/' 结尾的就是指向.md文件
            ['/javascript/one','第一个']    
          ]
        }
      ]
    },
    displayAllHeaders: true,
  },
  base: '/', // 基础地址
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
}