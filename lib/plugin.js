import { getUrlFileName } from './helpers'

export default (ctx, options) => {
  ctx.$payloadURL = route => {
    const timestamp = '<%= options.timestamp %>'
    const base = '<%= options.base %>'
    const subFolders = '<%= options.subFolders %>'

    return document.location.origin + getUrlFileName({ base, extension: 'json', route, timestamp, subFolders })
  }
}
