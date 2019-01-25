export default (ctx) => {
  ctx.$payloadURL = route => {
    //TODO router base compability and payload file name config
    return document.location.origin + route.path + '/payload.json'
  }
}
