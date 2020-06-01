const path = require("path")
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js');
const filehelper = require('./utils/initPage.js');

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
      { text: '前端', link: '/web/'},  
      { 
        text: '联系我',
        items: [
          {text: 'github', link: 'https://github.com/jsnobug'},
          {text: 'gitee', link: 'https://gitee.com/xiao_zheng_123'},
        ]
      }  
    ],
    // 侧边栏菜单( 一个模块对应一个菜单形式 )vue
    sidebar: [
      utils.genSidebar('javascript', filehelper.getFileName(rootpath+"/web/javascript/")),
      utils.genSidebar('vue', filehelper.getFileName(rootpath+"/web/vue/")),
      utils.genSidebar('git', filehelper.getFileName(rootpath+"/web/git/")),
      utils.genSidebar('mockjs', filehelper.getFileName(rootpath+"/web/mock/")),
    ], // 侧边栏配置
    displayAllHeaders: true,
  },
  base: '/', // 基础地址
  markdown: {
    // lineNumbers: true, // 代码块显示行号
    // // markdown-it-anchor 的选项
    // anchor: { permalink: false },
    // // markdown-it-toc 的选项
    // toc: { includeLevel: [1, 2] },
    // extendMarkdown: md => {
    //   // 使用更多的 markdown-it 插件!
    //   md.use(require('markdown-it-xxx'))
    // }
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/nprogress']
}