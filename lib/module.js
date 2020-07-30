const fs = require('fs')
const path = require('path')

const { getFsFileName, getUrlFileName } = require('./helpers')

const payloadKey = '__NUXT__'

let extractPayload = function(html, route, base, timestamp, subFolders){
  let chunks = html.split(`<script>window.${payloadKey}=`)
  let pre = chunks[0]
  let payload = chunks[1].split('</script>').shift()
  let post = chunks[1].split('</script>').slice(1).join('</script>')

  return {
    html: pre + '<script defer src="' + getUrlFileName({ base, route, extension: 'js', timestamp, subFolders }) + '"></script>' + post,
    payload
  }
}


let writePayload = function(payload, route, root, timestamp, subFolders){
  let subpath = root
  let dirsToCreate = route.split('/')
  if (subFolders === false) {
    dirsToCreate.splice(-1, 1)
  }
  for(let subdir of dirsToCreate){
    if(subdir){
      subpath = path.join(subpath, subdir)
      if (!fs.existsSync(subpath)) fs.mkdirSync(subpath)
    }
  }

  let payloadBody = `window.${payloadKey}=${payload}`

  fs.writeFile(getFsFileName({ root, route, extension: 'js', timestamp, subFolders }), payloadBody, 'utf8', err => {
    if (err) return console.error(err);
  });

  let data
  try { data = eval('('+payload+')') }
  catch (e) { throw `writePayload error for ${route}: ${e.message}` }

  // if routes are nested, merge them into one object
  let availableData = data.data
    .filter(d => Object.keys(d).length > 0)
    .reduce((prev, current) => {
      const colidingKey = Object.keys(prev).find(key => Object.keys(current).includes(key))
      if(colidingKey) console.error('Payload-extractor fails to extract nested routes data correctly because two routes have same field returned by asyncData: ' + colidingKey)

      return { ...prev, ...current }
    }, {})

  fs.writeFile(getFsFileName({ root, route, extension: 'json', timestamp, subFolders }), availableData ? JSON.stringify(availableData) : '{}', 'utf8', err => {
    if (err) return console.error(err)
  })
}

module.exports = function extractor({ blacklist, versioning = true }) {
  let timestamp = ''
  if(versioning) timestamp = +(new Date())

  const distDir = this.nuxt.options.generate.dir
  const routerBase = this.nuxt.options.router.base
  const base = routerBase.slice(0, -1)
  const subFolders = this.nuxt.options.generate.subFolders

  if (this.nuxt.options.mode === 'spa') {
    console.warn('nuxt generate is running in spa-only mode, so nuxt-payload-extractor will be ignored')
    return null
  }

  this.nuxt.hook('generate:page', async page => {
    if(blacklist && blacklist.includes(page.route)) return page

    let { html, payload } = extractPayload(page.html, page.route, base, timestamp, subFolders)
    writePayload(payload, page.route, distDir, timestamp, subFolders)

    page.html = html

    return page
  })

  this.addTemplate({
    fileName: 'payload-extractor/helpers.js',
    src: path.resolve(__dirname, 'helpers.js')
  })

  this.addPlugin({
    fileName: 'payload-extractor/plugin.js',
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      timestamp,
      base,
      subFolders
    }
  })
}

module.exports.meta = require('../package.json')
