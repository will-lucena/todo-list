import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router).mount("#app")
