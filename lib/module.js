const fs = require('fs')
const path = require('path')

let extractPayload = function(html, route){
  let chunks = html.split('<script>window.__NUXT__=')
  let pre = chunks[0]
  let payload = chunks[1].split('</script>').shift()
  let post = chunks[1].split('</script>').slice(1).join('</script>')

  return {
    html: pre + '<script defer src="' + route + '/payload.js"></script>' + post,
    payload
  }
}

let writePayload = function(payload, route){
  let dir = path.resolve(__dirname).replace('modules', 'dist') + route

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(path.resolve(dir, 'payload.js'), 'window.__NUXT__=' + payload, 'utf8', function (err) {
    if (err) return console.error(err);
  });
  // TODO get rid of json duplicate and eval, don't know how
  fs.writeFile(path.resolve(dir, 'payload.json'), JSON.stringify(eval('('+payload+')').data[0]), 'utf8', function (err) {
    if (err) return console.error(err);
  });
}

module.exports = function extractor({ blacklist }) {
  this.nuxt.hook('generate:page', async page => {
    if(blacklist && blacklist.includes(page.route)) return page;

    let { html, payload } = extractPayload(page.html, page.route)

    writePayload(payload, page.route)

    page.html = html

    return page
  })
}

module.exports.meta = require('../package.json')
