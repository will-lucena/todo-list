import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})


app.use(createPinia()).use(router).use(vuetify).mount("#app")
