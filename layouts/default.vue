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
html,
body {
  background-color: #38474f;
}
body {
  font-size: calc(0.95rem + 0.1vw);
}


</style>
