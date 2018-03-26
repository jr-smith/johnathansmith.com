<template>
<div id="home">
  <div class="hero-body">
    <div class="container">
      <div id="intro" class="has-text-centered intro">
        <img src="/johnathan.png" class="profile-photo" >
        <h1 class="title is-size-1">
          Johnathan R. Smith
        </h1>
        <h2 class="subtitle is-size-2 white">
          Full Stack Web Developer in Raleigh, NC
        </h2>
        <h3 class="is-size-3 white">I work with PHP/Laravel, C#, WordPress, JavaScript, Vue, Node, html/css, and both relational &amp; NoSQL Databases.</h3>
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
  <section class="section" id="contact">

    <div class="container">
      <h4 class="title is-size-3">In need of web development? Let me know.</h4>
      <form  :name="formName" netlify-honeypot="bot" method="POST"  netlify>
        <p class="hidden">
          <label>Don’t fill this out if you're human: <input v-model="form.bot" name="bot"></label>
        </p>
  
        <b-field label="Name">
            <b-input v-model="form.name" name="name" type="text" />
        </b-field>

        <b-field label="Email">
            <b-input v-model="form.email" name="email" type="email" />
        </b-field>

        <b-field label="Phone">
            <b-input v-model="form.phone" maxlength="15" type="tel" name="phone" ></b-input>
        </b-field>

        <b-field label="Message">
            <b-input v-model="form.message" maxlength="200" type="textarea" name="message" ></b-input>
        </b-field>


        <b-field>
            <p class="control">
                <button class="button is-primary">
                  Send message
                </button>
            </p>
        </b-field>  
      </form>

    </div>

  </section>
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
    const context = require.context("~/content/blog/posts/", false, /\.json$/)
    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/blog/${key.replace(".json", "").replace("./", "")}`
    }))
    return {
      posts,
      formName: "contact",
      form: {
        email: "",
        name: "",
        phone: "",
        message: "",
        bot: ""
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        let formdata = new FormData()
        formdata.append("email", this.form.email)
        formdata.append("name", this.form.name)
        formdata.append("phone", this.form.phone)
        formdata.append("message", this.form.message)
        formdata.append("bot", this.form.bot)
        const formSubmission = await this.$axios({
          url: this.formName,
          type: "post",
          data: formdata
        })

        this.$toast.open({
          message: "Thanks for the message. I'll be in touch shortly.",
          type: "is-success"
        })
      } catch (e) {
        this.$snackbar.open({
          duration: 5000,
          message: e.message,
          type: "is-danger"
        })
        throw new Error(e)
      }
    }
  }
}
</script>

<style lang="scss" >
#home {
  .hidden {
    display: none;
  }
  #contact {
    background-color: #FFF;
  }
  .profile-photo {
    display: block;
    max-width: 200px;
    border-radius: 50%;
    margin: 0 auto 1rem auto;
  }
  .intro {
    background-color: transparent;
  }
}

</style>