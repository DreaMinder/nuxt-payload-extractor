# Nuxt payload extractor

Nuxt.js module that makes `nuxt generate` command to store html and payload separately. See it in action on my site: [DreaMinder.pro](https://DreaMinder.pro)

## Benefits

✓ If you use external API to fill your project with data, even after your site has been prerendered, you need to keep your API running to make client-side navigation possible. With this module your API data stores along with prerendered HTML, so the issue is solved

✓ Increases page download speed for crawlers

✓ Makes HTML source code look cleaner

✓ Decreases load on API server

✓ Makes prerendered and client rendered pages consistent in case API data changed after you deployed prerendered pages

✓ Decreases initial page download time x1.5-2 (which is actually doesn't affect perfomance)

## Setup
- Add `nuxt-payload-extractor` dependency
- Define nuxt module:

```js
{
  modules: [
   'nuxt-payload-extractor'
  ]
}
```

- Add asyncData custom logic with $payloadURL helper

```js
async asyncData({ $axios, $payloadURL, route }){
  //if generated and works as client navigation, fetch previously saved static JSON payload
  if(process.static && process.client)
    return await $axios.$get($payloadURL(route))

  //your request logic
  let post = await $axios.$get(`/post.json`)
  return {
    post
  }
}
```

- Run `npm run generate`

## GraphQL usage

You'll need axios in your production bundle, your graphQL client is only invoked server-side, on 'generate' command.

```js
async asyncData({ $axios, $payloadURL, route, app }) {
  if (process.static && process.client) {
    return await $axios.$get($payloadURL(route))
  } else {
    let gqlData = await app.apolloProvider.defaultClient.query({
      query: gqlquery
    })
    return {
      gqlData
    }
  }
}
```

## Options

You can blacklist specific paths, so they will be generated in native way. But you have to disable payload request inside of asyncData yourself. Check out example dir for details.

If you need to cache all json and js payloads in browser, you can use `versioning: true` flag to add timestamp to payload filenames. Keep in mind that timestamp changes on every generate run, so cache invalidates. Also, `nuxt generate --no-build` is not supported in this case.

## Caveats

There may be issues with vuex data requests and nested routes.
Keep in mind that payload.json has not hash in its name, so it shouldn't be cached in browser.

## How it works

- Extracts `<script>window.__NUXT__= ... </script>` replacing it with `<script src="payload.js">`
- Makes two files along with `index.html` of prerendered page: `payload.js` for initial page load and `payload.json` for client-side navigation
