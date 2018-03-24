<template>
  <section class="container">
    <h1>{{ name }}</h1>
    <b-input v-model="name2" />
  </section>
</template>

<script>

export default {
  data() {
    return {
      name: "world",
      name2: "Johnathan's site23"
    }
  }
}
</script>
<style lang="scss">

</style>
