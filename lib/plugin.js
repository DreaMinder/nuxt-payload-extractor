import { getUrlFileName } from './helpers'

export default (ctx, options) => {
  ctx.$payloadURL = route => {
    const base = '<%= options.base %>'
    const timestamp = '<%= options.timestamp %>'
    const subFolders = '<%= options.subFolders %>'
    const filePath = getUrlFileName({ 
      extension: 'json', 
      route: route.path, 
      subFolders,
      timestamp, 
      base, 
    })
    return document.location.origin + filePath
  }
}
