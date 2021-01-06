const {getHTML} = require('./getHtml')
const {saveImg} = require('./saveImg')
const {makeDir} = require('./makeDir')
const {url, targetSelector, urlAttrName, distPath} = require('../config')
const URL = require('url')
const {hostname, path, protocol} = URL.parse(url)


getHTML().then($ => {
  makeDir(distPath)

  const items = $(targetSelector).toArray()
  items.map((item, idx) => {
    const originSrc = $(item).attr(urlAttrName)
    const src = /^http/.test(originSrc) ? originSrc : `${protocol}//${hostname + originSrc}`
      
    saveImg(src, idx)
  });
})
