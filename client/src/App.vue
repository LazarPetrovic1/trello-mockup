<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/layout/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>

</style>
