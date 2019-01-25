<template>
  <section>
    <article class="post">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content" />
    </article>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, $payloadURL, route, error }){
    try {
      if(process.static && process.client && route.path !== '/'){
        //route.path !== '/' - because this route is blacklisted for nuxt-payload-extractor
        let {data} = await $axios.get($payloadURL(route))
        return data
      }

      let post = await $axios.$get(`/post.json`)
      return {
        post
      }

      //Or alternative way
      // let payload = {};
      // if(process.static && process.client && route.path !== '/')
      //   payload = await app.$axios.$get(document.location.origin + route.path + '/payload.json')
      // else
      //   payload.post = await app.$axios.$get(`/post.json`)
      //
      // return payload
    } catch (e) {
      console.error(e);
      error({ statusCode: 404, message: e.message })
    }
  }
}
</script>

<style scoped>

section{
  padding: 30px
}

</style>
