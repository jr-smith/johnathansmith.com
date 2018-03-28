<template>
  <div id="home">
    <div class="hero-body">
      <div class="container">
        <div id="intro" class="has-text-centered intro">
          <img src="/johnathan.png" class="profile-photo" alt="Johnathan R. Smith - Full Stack Web Developer in Raleigh, NC" >
          <h1 class="title is-size-1">
            Johnathan R. Smith
          </h1>
          <h2 class="subtitle is-size-2 white">
            Full Stack Web Developer in Raleigh, NC
          </h2>
          <h3 class="is-size-3 white">I work with PHP + Laravel, C# + ASP.NET, JavaScript, Vue, Node, html/css, and both relational &amp; NoSQL Databases.</h3>
        </div>
      </div>
    </div>

    <section id="clients" class="hero section is-info">
      <div class="container">
        <h4 class="title is-size-3 has-text-centered">Some of my clients</h4>
        <div class="columns has-text-centered">
          <div class="column is-one-quarter">
            <img src="/images/uploads/ncstate.png" alt="nc state" >
          </div>
          <div class="column is-one-quarter">
            <img src="/images/uploads/freedm.png" alt="freedm systems center" >
          </div>
          <div class="column is-one-quarter">
            <img src="/images/uploads/popefoundation.png" alt="pope foundation" >
          </div>
          <div class="column is-one-quarter">
            <img src="/images/uploads/raleighmold.png" alt="raleigh mold" >
          </div>
        </div>
      </div>
    </section>
    <section id="contact" class="section">

      <div class="container">
        <h4 class="title is-size-3">In need of web development? Let me know.</h4>
        <form :action="formUrl" :name="formName" class="" netlify-honeypot="bot-field" netlify method="POST">
          <input :value="formName" type="hidden" name="form-name">
          <p class="hidden">
            <label>Don’t fill this out if you're human: <input v-model="form.botField" name="bot-field"></label>
          </p>

          <b-field label="Name">
            <b-input v-model="form.name" name="name" type="text" />
          </b-field>

          <b-field label="Email">
            <b-input v-model="form.email" name="email" type="email" />
          </b-field>

          <b-field label="Phone">
            <b-input v-model="form.phone" maxlength="15" type="tel" name="phone" />
          </b-field>

          <b-field label="Message">
            <b-input v-model="form.message" maxlength="200" type="textarea" name="message" />
          </b-field>


          <div class="field">
            <div netlify-recaptcha></div>
          </div>
          

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
  props: {
    container: HTMLElement
  },
  head: {
    title: "Johnathan R. Smith - Full Stack Web Developer in Raleigh, NC",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "I work with PHP + Laravel, C# + ASP.NET, JavaScript, Vue, Node, html/css, and both relational & NoSQL Databases."
      }
    ]
  },
  data() {
    return {
      formAction: "contact",
      formName: "contact",
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
        botField: ""
      }
    }
  },
  computed: {
    formUrl() {
      // return window.location.href + this.formAction + "/"
      return "/" + this.formAction + "/"
    }
  },
  methods: {
    async onSubmit() {
      console.log(this.form)
      console.log(this.formName)
      console.log(this.formAction)
      console.log(this.formUrl)
      try {
        let formdata = new FormData()
        formdata.append("name", this.form.name)
        formdata.append("email", this.form.email)
        formdata.append("phone", this.form.phone)
        formdata.append("message", this.form.message)
        // formdata.append("bot-field", this.form.botField)
        for (var pair of formdata.entries()) {
          console.log(pair[0] + ", " + pair[1])
        }

        await this.$axios({
          url: this.formUrl,
          type: "post",
          data: this.formdata,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })

        this.$toast.open({
          message: "Thanks for the message. I'll be in touch shortly.",
          type: "is-success"
        })

        await this.$axios({
          url: this.formUrl,
          type: "post",
          data: this.form,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
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
    background-color: #fff;
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

#clients {
  img {
    width: 245px;
  }
}
</style>
