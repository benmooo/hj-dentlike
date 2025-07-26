import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import { i18n } from './core/config/i18n'
import '@/assets/style/global.css'
import '@/assets/style/animation.css'

import App from './app'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// i18n
app.use(i18n)

// nuxtui
app.use(ui)

app.mount('#app')
