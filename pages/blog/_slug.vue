<template>
  <article>
    <div class="hero-body">
      <div class="container">
        <div class="intro content">
          <h1 class="post-title is-size-1">{{title}}</h1>
          <img :src="thumbnail" class="post-thumbnail" />
          <div class="post-body" v-html="$md.render(body)"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    }
  },
  async asyncData({params}) {
    let post = await import("~/content/blog/posts/" + params.slug + ".json")
    return post
  },
  head() {
    return {
      title: this.metatitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metadescription
        }
      ]
    }
  }
}
</script>
