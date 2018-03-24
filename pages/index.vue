<template>
<section class="hero is-dark is-medium">
  <div class="hero-body">
    <div class="container">
      <div id="intro" class="text-center">
        <img src="/johnathan.png" class="profile-photo" />
        <h1 class="title">
          Johnathan Smith
        </h1>
        <h2 class="subtitle">
          Web Developer in Raleigh, NC
        </h2>
        <p>I work with PHP/Laravel, C#, WordPress, JavaScript, Vue, Node, html/css, and both relational and NoSQL Databases.</p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  head: {
    title: "Johnathan Smith2",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "this is the meta description too"
      }
    ]
  },
  data() {
    return {
      name: "world",
      name2: "Johnathan's site23"
    }
  }
}
</script>
<style lang="scss">
.white {
  background-color: #fff;
}
#intro {
  margin: 0 auto;
  background-color: #FFF;
  border-radius: 15px;
  padding: 3rem;
  max-width: 80%;
  * {
    color: #363636;
  }
}
.profile-photo {
  display: block;
  max-width: 200px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
}
</style>
