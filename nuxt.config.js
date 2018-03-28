var glob = require("glob")
var path = require("path")

const webpack = require('webpack')
const WebpackBar = require('webpackbar')


global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement


// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  "/blog": "blog/posts/*.json"
})

module.exports = {
  modules: [
    "@nuxtjs/axios",
    //"@nuxtjs/component-cache",
    "@nuxtjs/markdownit"
  ],
  axios: {
    // proxyHeaders: false
  },
  markdownit: {
    injected: true
  },
  plugins: [
    { src: "~/plugins/buefy.js", ssr: true }
    // new WebpackBar()
  ],
  head: {
    title: "Johnathan Smith",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "this is the meta description"
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" }
    ],
    script: [
      {src: "https://use.fontawesome.com/releases/v5.0.8/js/brands.js"},
      {src: "https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js"}
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png"
      },
      { rel: "manifest", href: "/favicons/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicons/safari-pinned-tab.svg",
        color: "#5bbad5"
      }
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://cdnjs.cloudflare.com/ajax/libs/bulmaswatch/0.6.2/cerulean/bulmaswatch.min.css"
      // }
    ]
  },
  loading: { color: "#c71c22" },
  generate: {
    routes: dynamicRoutes
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['buefy'] 
    /*
    ** Run ESLint on save
  
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
    */
  },
  css: [{ src: "@/assets/bulma-theme.scss", lang: "sass" }]
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url]
      return glob
        .sync(filepathGlob, { cwd: "content" })
        .map(filepath => `${url}/${path.basename(filepath, ".json")}`)
    })
  )
}
