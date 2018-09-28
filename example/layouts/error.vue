<template>
  <div class="wrap">
    <div class="main">
      <h1>{{ error.statusCode }}</h1>
      <pre>{{ error.message }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head: {
    title: 'Error'
  }
}
</script>

<style scoped>
  .main{
    text-align: center;
    line-height: 100px;
    padding: 100px;
  }
  h1{
    font-size: 60px;
    font-weight: 400;
  }
</style>
