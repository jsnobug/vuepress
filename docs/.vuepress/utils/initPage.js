const fs = require('fs');
var filehelper = {
  getFileName:function(rpath) {
    let filenames = []
    fs.readdirSync(rpath).forEach(filepath => {
      if (filepath.includes('README.md')) {
        filepath = ''
      }
      var file = (rpath + filepath).slice((rpath + filepath).indexOf('/'))
      filenames.push(file)
    })
    filenames = filenames.sort()
    return filenames
  }
}
module.exports = filehelper
