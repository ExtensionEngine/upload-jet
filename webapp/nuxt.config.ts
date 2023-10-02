// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/nuxt'],
  devServer: {
    port: 8080
  },
  runtimeConfig: {
    public: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  colorMode: {
    preference: 'light'
  }
});
