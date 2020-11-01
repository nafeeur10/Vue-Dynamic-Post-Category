<template>
  <div id="app">
    <div id="nav">
      <nav-bar />
    </div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from './partials/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>
<style>

</style>
