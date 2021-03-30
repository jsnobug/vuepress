const path = require("path")
const rootPath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js')
const fileHelper = require('./utils/initPage.js')

module.exports = {
  title: 'Zfy Blog', // 标题
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    // 这里的 '/' 指向 docs/.vuepress/public 文件目录
    // 即 docs/.vuepress/public/img/geass-bg.ico
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  base: '/',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'vue', link: '/vue/'},
      {text: 'Web',
        items: [
          {text: 'js', link: '/js/'},
          {text: 'css', link: '/css/'},
        ]
      },
      {text: '组件', link: '/webComponents/'},
      {
        text: '常用网站',
        items: [
          {text: 'gitee', link: 'https://gitee.com/xiao_zheng_123'},
          {text: 'github', link: 'https://github.com/jsnobug'},
        ]
      }
    ],
    sidebar: {
      '/webComponents/': [
        utils.genSidebar({title: '测试', children: fileHelper.getFileName(rootPath+'/webComponents/', 'zfy')})
      ],
      '/vue/': [
        utils.genSidebar({title: 'vue2.0', children: fileHelper.getFileName(rootPath+'/vue/', 'vue2.0'), sidebarDepth: 2}),
        utils.genSidebar({title: 'vue3.0', children: fileHelper.getFileName(rootPath+'/vue/', 'vue3.0'), sidebarDepth: 2})
      ],
      '/js/': [
        utils.genSidebar({title: 'js', children: fileHelper.getFileName(rootPath+'/js/'), sidebarDepth: 2})
      ],
      '/css/': [
        utils.genSidebar({title: 'css', children: fileHelper.getFileName(rootPath+'/css/'), sidebarDepth: 2})
      ]
    },
  },
  plugins: ['demo-container', '@vuepress/back-to-top', '@vuepress/nprogress', '@vuepress/active-header-links']
}
