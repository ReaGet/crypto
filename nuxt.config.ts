import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "./src",
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@/assets/css/global.css'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      nodePolyfills()
    ]
  },
  runtimeConfig: {
    socketPort: 8888,
  }
});