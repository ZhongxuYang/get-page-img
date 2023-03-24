const {getHTML} = require('./getHtml')
const {saveImg} = require('./saveImg')
const {makeDir} = require('./makeDir')
const {url, targetSelector, urlAttrName, distPath} = require('../config')
const URL = require('url')
const {hostname, path, protocol} = URL.parse(url)


getHTML().then(async $ => {
  await makeDir(distPath)

  const items = $(targetSelector).toArray()
  const allTasks = items.map((item, idx) => {
    const originSrc = $(item).attr(urlAttrName)
    const src = /^http/.test(originSrc) ? originSrc : `${protocol}//${hostname + originSrc}`
      
    return saveImg(src, idx)
  });
  Promise.all(allTasks).then(() => {
    process.exit(0)
  }).catch(() => {
    console.log('???');
  })
})
