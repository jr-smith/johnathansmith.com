module.exports = {
  plugins: [
    // ssr: false to only include it on client-side
    { src: "~/plugins/buefy.js", ssr: false }
  ],
  router: {
    linkActiveClass: "active-link"
  },
  // modules: ["nuxt-netlify-cms"],
  // srcDir: "client",
  /*
  ** Headers of the page
  */
  head: {
    title: "Johnathan Smith",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "this is the meta description"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/bulmaswatch/0.6.2/cerulean/bulmaswatch.min.css"
      }
      // { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Quattrocento+Sans" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  // build: {
  //   // vendor: ["axios"]
  //   // extend(config, { isDev, isClient }) {
  //   //   if (isDev && isClient) {
  //   //     config.module.rules.push({
  //   //       enforce: "pre",
  //   //       test: /\.(js|vue)$/,
  //   //       loader: "eslint-loader",
  //   //       exclude: /(node_modules)/
  //   //     })
  //   //   }
  //   // }
  // }
}
