// fs模块   功能 读写  追加 文件夹
const fs = require('fs');
// 发起请求 可以用与接收文件流
const request = require('request');

// 图片生成
function createImg(name) {
  fs.mkdir(`./content`, error => {
    
  })
}

// 图片存储
function saveImg(src, name) {
  createImg(name)
  // createWriteStream 创建一个可读的文件流
  let writeStream = fs.createWriteStream(`./content/${name}.jpg`);

  // 获取当前图片的信息
  let readStream = request(src);
  //写入对应的文件夹中
  readStream.pipe(writeStream);
  // // 监听本次写入是否结束
  readStream.on('end', response => {
    writeStream.end();
  })
}

exports.saveImg = saveImg