/**
 *  读取侧导航栏children
 *  @param rpath 读取的目录
 *  @param matchStr 要匹配的文件名
 */

const fs = require('fs');
let fileHelper = {
    getFileName:function(rpath, matchStr = '') {
        let filenames = []
        fs.readdirSync(rpath).forEach(filepath => {
            if (!filepath.includes('README.md') && filepath.includes(matchStr)) {
                var file = filepath.replace('.md', '')
                filenames.push(file)
            }
        })
        filenames = filenames.sort()
        return filenames
    }
}
module.exports = fileHelper
