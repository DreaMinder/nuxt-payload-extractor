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

let writePayload = function(payload, route, root){
  let dir = root + route

  let subpath = root
  for(let subdir of route.split('/')){
    if(subdir){
      subpath += '/' + subdir
      if (!fs.existsSync(subpath)) fs.mkdirSync(subpath);
    }
  }

  fs.writeFile(path.resolve(dir, 'payload.js'), 'window.__NUXT__=' + payload, 'utf8', function (err) {
    if (err) return console.error(err);
  });

  // Temporary hack: if data stores not in first array item for some reason, get data from second one.
  let data = eval('('+payload+')')
  let dataIndex = 0
  if(!Object.keys(data.data[dataIndex]).length) dataIndex = 1;

  // TODO get rid of json duplicate and eval, don't know how
  fs.writeFile(path.resolve(dir, 'payload.json'), JSON.stringify(data.data[dataIndex]), 'utf8', function (err) {
    if (err) return console.error(err);
  });
}

module.exports = function extractor({ blacklist }) {
  this.nuxt.hook('generate:page', async page => {
    if(!this.nuxt.options.generate.subFolders) throw new Error('generate.subFolders should be true for nuxt-payload-extractor');
    if(blacklist && blacklist.includes(page.route)) return page;

    let { html, payload } = extractPayload(page.html, page.route)

    writePayload(payload, page.route, this.nuxt.options.generate.dir)

    page.html = html

    return page
  })
}

module.exports.meta = require('../package.json')
