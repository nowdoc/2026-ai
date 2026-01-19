// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/ui-pro"],

  css: ["~/assets/css/main.css"],

  ssr: false,

  colorMode: {
    preference: "light",
  },

  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },

  runtimeConfig: {
    public: {
      appBuild: new Date(),
      appRev: "dev",
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
    },
  },
});
