// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/device', 'nuxt-icon'],
  devServer: {
    port: 8080
  },
  runtimeConfig: {
    public: {
      githubClientId: process.env.GITHUB_CLIENT_ID
    }
  }
});
