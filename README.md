# Nuxt payload extractor

Nuxt.js module that makes `nuxt generate` command to store html and payload separately. **Early stages of development, I warned ya!**

## Benefits

✓ If you use external API to fill your project with data, even after your site have been prerendered, you need to keep your API running to make client-side navigation possible. With this module your API data stores along with prerendered HTML, so the issue is solved

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

- Add asyncData custom logic

```js
async asyncData({ app, error, route }){
  try {
    let payload = {};
    if(process.static && process.client)
      payload = await app.$axios.$get(document.location.origin + route.path + '/payload.json')
    else
      payload.post = await app.$axios.$get(`/{your api data url}`)

    return payload
  } catch (e) {
    console.error(e);
    error({ statusCode: 404, message: e.message })
  }
}
```

- Run `npm run generate`

## How it works

- Extracts `<script>window.__NUXT__= ... </script>` replasing it with `<script src="payload.js">`
- Makes two files along with `index.html` of prerendered page: `payload.js` for initial page load and `payload.json` for client-side navigation
