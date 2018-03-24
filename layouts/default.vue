<template>
  <div>
    <nav-bar />
    <nuxt/>
  </div>
</template>
<script>
import NavBar from "../components/NavBar"
export default {
  components: {
    NavBar
  }
}
</script>

<style style="scss">
html, body {
  background-color: #38474F
}
.text-center {
  text-align: center;
}
</style>
