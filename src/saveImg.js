const fs = require('fs');
const request = require('request');
const {distPath} = require('../config');
const {ProgressBar} = require('./utils/progress-bar')

// 图片存储
function saveImg(src, index) {
  const writeStream = fs.createWriteStream(`${distPath}/${index}.jpg`);
  const options = {
    url: src,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  }
  const readStream = request.get(options);

  // 获取文件大小
  let fileSize = 0;
  readStream.on('response', (response) => {
    fileSize = parseInt(response.headers['content-length'], 10);
  });

  // 计算读取进度和网速
  let totalBytesRead = 0;
  let prevTimestamp = 0;
  const progressBar = new ProgressBar(index)
  readStream.on('data', (chunk) => {
    totalBytesRead += chunk.length;
    const progress = totalBytesRead / fileSize;

    // 计算网速
    const currentTimestamp = Date.now();
    const deltaTime = (currentTimestamp - prevTimestamp) / 1000; // 时间差，单位秒
    let speed = chunk.length / deltaTime; // 网速，单位 B/s
    speed = Number((speed / 1024).toFixed(2)) // KB/s
    prevTimestamp = currentTimestamp;

    progressBar.update(progress, speed)
    // console.log(`读取进度：${(progress * 100).toFixed(2)}%，网速：${(speed / 1024).toFixed(2)} KB/s`);
  });

  readStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      // console.log(`文件 ${index}.jpg 已保存到本地`);
      resolve(1);
    });
    writeStream.on('error', (err) => {
      progressBar.update(-1)
      // console.log(`保存文件 ${index}.jpg 失败: ${err.message}`);
      reject(err);
    });
  });
}

exports.saveImg = saveImg;
