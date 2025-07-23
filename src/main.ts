import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import '@/assets/style/global.css'

import App from './app'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// nuxtui
app.use(ui)

app.mount('#app')
