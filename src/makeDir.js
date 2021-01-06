const fs = require('fs')

const makeDir = (filePath) => {
  const existDir = fs.existsSync(filePath)

  if (!existDir) {
    console.log('该路径不存在');
    fs.mkdir(filePath, (err) => {
      if (err) {
        console.log('文件夹创建错误');
      } else {
        console.log('文件夹创建完成');
      }
    });
  }
}

exports.makeDir = makeDir