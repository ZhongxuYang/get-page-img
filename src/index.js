const {getHTML} = require('./getHtml')
const {saveImg} = require('./saveImg')
const {makeDir} = require('./makeDir')
const {url, targetSelector, urlAttrName, distPath} = require('../config')
const URL = require('url')
const {hostname, path, protocol} = URL.parse(url)
const fs = require('fs');

getHTML().then(async $ => {
  await makeDir(distPath)

  const items = $(targetSelector).toArray()
  // console.log(items)
  const allTasks = items.map((item, idx) => {
    const originSrc = $(item).attr(urlAttrName)
    // if (!originSrc || /^data:image/.test(originSrc)) return Promise.resolve(true)
    if (/^http/.test(originSrc)) {
      return saveImg(originSrc, idx)
    } else {
      const str = `${idx}:-----------\n${String(originSrc)}\n`
      // console.log(str, '----');
      fs.appendFile(`${distPath}/err.txt`, str, 'utf8', (err) => {
        if (err) throw err;
        console.log('Data was successfully appended to file!');
      });
      return Promise.resolve(true)
    }
    // const src = /^http/.test(originSrc) ? originSrc : `${protocol}//${hostname + originSrc}`
    // console.log(originSrc,'-',src);  
    // return saveImg(src, idx)
  });
  Promise.all(allTasks).then(() => {
    process.exit(0)
  }).catch(() => {
    console.log('???');
  })
})
