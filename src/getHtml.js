// 建立一个简易服务器
const http = require('http')
const URL = require('url')
const fs = require('fs')

// 解析html  功能强大   爬虫必备 像jquery一样的用法
const cheerio = require('cheerio')

const {url} = require('../config')

const {hostname, path, protocol} = URL.parse(url)

const getHTMLFromNet = (resolve, reject) => {
  // 要爬取目标的请求参数
  const requestOptions = {
    hostname,
    port: 80,
    path,
    method: 'GET',
    headers: {
      'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
    }
  }

  http.get(requestOptions, res => {
    let html = '';
    // 设置编码格式，防止获取到的html乱码
    res.setEncoding('utf-8')
  
    // 数据到达
    res.on('data', chunk => {
      html += chunk;
    })
  
    // 请求体数据完毕
    res.on('end', () => {
      const $ = cheerio.load(html);
      // saveText($);
      resolve($)
    })
  
  }).on('error', err => {
    reject(err)
  })
}

const getHTMLFromLocal = (resolve, reject) => {
  fs.readFile(url, (err, html) => {
    const $ = cheerio.load(html);
    // saveText($);
    resolve($)
  })
}

// 请求html
const getHTML = () => new Promise((resolve, reject) => {

  // 互联网请求
  if (hostname) {
    return getHTMLFromNet(resolve, reject)
  }
  // 本地请求
  else {
    return getHTMLFromLocal(resolve, reject)
  }

})


exports.getHTML = getHTML
