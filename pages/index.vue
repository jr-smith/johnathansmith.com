<template>
    <div class="hero-body">
      <div class="container">
        <div id="intro" class="has-text-centered intro">
          <img src="/johnathan.png" class="profile-photo" >
          <h1 class="title is-size-1">
            Johnathan R. Smith
          </h1>
          <h2 class="subtitle is-size-2">
            Full Stack Web Developer in Raleigh, NC
          </h2>
          <h3 class="is-size-3">I work with PHP/Laravel, C#, WordPress, JavaScript, Vue, Node, html/css, and both relational &amp; NoSQL Databases.</h3>
        </div>
      </div>
    <!--
    <ul>
      <li v-for="post in posts" :key="post.date">
        <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
    -->
    </div>
</template>

<script>


export default {
  components: {},
  head: {
    title: "Johnathan R. Smith - Full Stack Web Developer in Raleigh, NC",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "this is the meta description too"
      }
    ]
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context("~/content/blog/posts/", false, /\.json$/)

    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/blog/${key.replace(".json", "").replace("./", "")}`
    }))

    return { posts }
  }
}
</script>

<style lang="scss">

.profile-photo {
  display: block;
  max-width: 200px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
}
</style>