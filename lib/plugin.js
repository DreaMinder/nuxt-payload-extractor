export default (ctx) => {
  ctx.$payloadURL = route => {
    const fileName = 'payload<%= options.timestamp %>.json'
    const base = '<%= options.base %>'
    const normalizedPath = route.path.replace(/\/+$/, '')

    return document.location.origin + base + normalizedPath + '/' + fileName
  }
}
