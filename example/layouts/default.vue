<template>
  <div class="wrap">
    <page-header />
    <section class="content">
      <nuxt />
    </section>
    <page-footer />
  </div>
</template>

<script>
import pageHeader from '../components/header.vue'
import pageFooter from '../components/footer.vue'

export default {
  components: {
    pageHeader,
    pageFooter
  }
}
</script>

<style>

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #333;
  font-size: 15px;
  line-height: 25px;
  font-weight: 400;
  min-width: 410px;
}

a{
  border-bottom: 1px solid #333;
  color: #111;
  text-decoration: none;
}

.content{
  padding: 40px;
  max-width: 900px;
  margin: 10px auto;
  min-height: 80vh;
}

.page-enter-active, .page-leave-active {
  transition: opacity .2s
}

.page-enter, .page-leave-active {
  opacity: 0
}

</style>
