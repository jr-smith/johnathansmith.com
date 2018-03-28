<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/" ><strong>Johnathan Smith</strong></nuxt-link>
        <div class="navbar-burger" data-target="main-menu">
          <span/>
          <span/>
          <span/>
        </div>
      </div>
      <div id="main-menu" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/resume" class="navbar-item">
            <span class="bd-emoji">⭐️</span>
            Resume
          </nuxt-link>
          <nuxt-link to="/about" class="navbar-item">
            About
          </nuxt-link>
          <nuxt-link to="/blog" class="hidden navbar-item">
            Blog
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <a href="https://www.linkedin.com/in/johnathansmith/" class="navbar-item" target="_blank">
            <i class="fab fa-linkedin fa-2x"/>
          </a>
          <a href="https://github.com/jr-smith" class="navbar-item" target="_blank">
            <i class="fab fa-github-square fa-2x"/>
          </a>
          <a href="https://twitter.com/heyitsjohnathan" class="navbar-item" target="_blank">
            <i class="fab fa-twitter-square fa-2x"/>
          </a>
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
@media (max-width: 1023px) {
  #main-menu {
    background-color: #37a5e5;
  }
}
</style>
