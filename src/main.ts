import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})


app.use(createPinia()).use(router).use(vuetify).mount("#app")
