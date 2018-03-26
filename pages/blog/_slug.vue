<template>
  <article>
    <div class="hero-body">
      <div class="container">
        <div class="has-text-centered intro content">
          <h1 class="post-title is-size-1">{{ title }}</h1>
          <img :src="thumbnail" class="block" />
          <div class="post-body">{{body}}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ params }) {
    console.log(params)
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let post = await import("~/content/blog/posts/" + params.slug + ".json")
    console.log(post)
    return post
  },
  head: {
    title: metatitle,
    meta: [
      {
        hid: "description",
        name: "description",
        content: metadescription
      }
    ]
  }
}
</script>
