<template>
  <div>
    <section class="section">
      <div class="container">
        <div id="about" class="intro content">
          <h1 class="title is-size-3 has-text-centered">About Johnathan</h1>
          <div class="columns is-tablet">
            <div class="column is-narrow has-text-centered">
              <figure class="image is-128x128 is-pulled-left block">
                <img src="/images/uploads/johnathan-sarah.jpg">
              </figure>
              <div class="is-clearfix"/><br>
              <figure class="image is-128x128 is-pulled-left block">
                <img src="/images/uploads/kristabelle.jpg">
              </figure>
              <div class="is-clearfix"/><br>
            </div>
            <div class="column">
              <p>Johnathan lives in Raleigh, NC with his beautiful, amazing wife Sarah and their adorable daughter Kristabelle (just look at those eyes 😁). Quirky fact: one time while trekking through Iceland, he ate puffin and whale 🤨</p>
              <p>He enjoys family time, pinball, hiking, trying new coffee blends, and engineering awesome web applications.</p>
              <p>Some coding technologies that currently pique his interest are:</p>
              <ul class="list-arrows">
                <li>GraphQL</li>
                <li>Node</li>
                <li>.NET Core</li>
                <li>Native Script</li>
                <li>Nuxt + SSR</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head: {
    title: "About Johnathan R. Smith - Full Stack Web Developer in Raleigh, NC",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Johnathan lives in Raleigh, NC with his beautiful, amazing wife Sarah and their adorable daughter Kristabelle."
      }
    ]
  }
  }
</script>

<style lang="scss" scoped>
figure {
  display: block;
}
</style>
