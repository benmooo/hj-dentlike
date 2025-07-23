import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/hello-world'
import { defineComponent } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import UButton from '@nuxt/ui/components/Button.vue'

import { useColorMode } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  setup() {
    const mode = useColorMode()

    return () => (
      <UApp>
        <div>
          <header>
            <div class="wrapper">
              <HelloWorld msg="You did it!" />

              <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
              </nav>
            </div>
          </header>

          <RouterView />

          <UButton
            icon={mode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'}
            color="neutral"
            variant="ghost"
            onClick={() => {
              mode.value = mode.value === 'dark' ? 'light' : 'dark'
            }}
          />
        </div>
      </UApp>
    )
  },
})
