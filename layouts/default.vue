<template>
  <div>
    <nav-bar />
    <nuxt/>
  </div>
</template>
<script>
import NavBar from "../components/NavBar"
export default {
  components: {
    NavBar
  }
}
</script>

<style style="scss">
.centered {
  margin: 0 auto;
}
html body .title {
  color: #37a5e5;
}
.content p:not(:last-child),
.content dl:not(:last-child),
.content ol:not(:last-child),
.content ul:not(:last-child),
.content blockquote:not(:last-child),
.content pre:not(:last-child),
.content table:not(:last-child) {
  margin-bottom: 1em;
}
html,
body {
  background-color: #38474f;
}
body {
  font-size: calc(0.95rem + 0.1vw);
}
.white {
  color: #fff;
}
.intro {
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  padding: 3rem;
  @media (min-width: 769px) {
    max-width: 80%;
  }
  * {
    color: #363636;
  }
}

ul.list-arrows {
  padding-left: 2rem;
}

.list-arrows li {
  margin-bottom: 1rem;
}

.list-arrows li:before {
  display: inline-block;
  content: "\2192 \0020";
  margin-right: 1rem;
}

form {
  max-width: 500px;
}

.content figure.block {
  margin: 0;
  display: block;
}
</style>
