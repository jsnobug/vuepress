/**
 *  读取侧导航栏
 *  @param title 侧导航栏标题
 *  @param children 侧导航栏文件
 *  @param collapsable 是否可折叠
 *  @param sidebarDepth 显示层级
 */

const utils = {
    genSidebar: function ({title, children = [''], collapsable = true, sidebarDepth = 0}) {
        return {
            title,
            children,
            collapsable,
            sidebarDepth
        }
    }
}

module.exports = utils
