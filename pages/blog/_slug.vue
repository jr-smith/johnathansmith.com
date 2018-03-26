<template>
  <article>
    <div class="hero-body">
      <div class="container">
        <div class="has-text-centered intro">
          <h1 class="title is-size-1">{{ title }}</h1>
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
  }
}
</script>
