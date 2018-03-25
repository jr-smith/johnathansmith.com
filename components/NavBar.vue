<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/" ><span>Johnathan Smith</span></nuxt-link>
        <div class="navbar-burger">
          <span/>
          <span/>
          <span/>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/resume" class="navbar-item">
            <span class="bd-emoji">⭐️</span>
            Resume
          </nuxt-link>
        </div>
      </div>

    </div>
  </nav>
</template>
<script>
export default {}
</script>

<style lang="scss">
.navbar {
  background-color: black;
}
</style>
