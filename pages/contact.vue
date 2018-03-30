<template>
  <div>
    <section class="hero is-medium is-success is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-spaced">
            Thanks for contacting me! I'll be in touch shortly
          </h1>
          <h2 class="subtitle">
            <nuxt-link to="/" style="text-decoration:underline">Now go back to the home page!</nuxt-link>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head: {
    title:
      "Conact Johnathan Smith - Freelance Full Stack Web Developer in Raleigh, NC",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Contact me about work with PHP + Laravel, C# + ASP.NET, JavaScript, Vue, Node, html/css, or both relational & NoSQL Databases."
      }
    ]
  }
}
</script>

<style lang="scss">
</style>
