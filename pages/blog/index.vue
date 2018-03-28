<template>
  <div>
    <section class="hero section is-primary">
      <div class="container">
        <div class="columns">
          <div v-for="post in posts" :key="post.date" class="column is-one-third" >
            <nuxt-link :to="post._path">
              {{ post.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    const context = require.context("~/content/blog/posts/", false, /\.json$/)
    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/blog/${key.replace(".json", "").replace("./", "")}`
    }))
    return {
      posts,
      title: ""
    }
  },
  head() {
    return {
      title: "Full Stack Web Development Blog by Johnathan R. Smith",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Tutorials, posts, and more about all aspects of web development."
        }
      ]
    }
  }
}
</script>

<style>
</style>
