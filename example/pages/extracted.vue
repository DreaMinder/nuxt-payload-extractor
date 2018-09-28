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
  async asyncData({ app, params, error, route }){
    try {
      let payload = {};
      if(process.static && process.client && route.path !== '/') //lil hack for page without extracted payload
        payload = await app.$axios.$get(document.location.origin + route.path + '/payload.json')
      else
        payload.post = await app.$axios.$get(`/post.json`)

      return payload
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
