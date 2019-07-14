export default (ctx) => {
  ctx.$payloadURL = route => {
    // TODO router base compability and payload file name config
    const fileName = 'payload<%= options.timestamp %>.json'
    const normalizedPath = route.path.replace(/\/+$/, '')
    return document.location.origin + normalizedPath + '/' + fileName
  }
}
