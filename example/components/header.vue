<template>
  <header>
    <nav>
      <nuxt-link to="/extracted">Page with extracted payload</nuxt-link>
      <nuxt-link to="/">Page with inlined payload</nuxt-link>
    </nav>
  </header>
</template>

<style>

header{
  text-align: center;
  padding: 40px;
  background: #ebebeb;
}

header a{
  display: inline-block;
  margin: 10px;
  text-transform: uppercase;
  border-bottom: none
}

header a.nuxt-link-exact-active{
  border-bottom: 1px solid #333
}

</style>
