import { RouterLink, RouterView } from 'vue-router'
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
              <nav class={'flex gap-4 items-center'}>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>

                <RouterLink to="/auth/login">Login</RouterLink>
                <RouterLink to="/auth/reset-password/verify-email">Reset Password</RouterLink>
                <RouterLink to="/auth/reset-password/verify-otp">Verify OTP</RouterLink>
                <RouterLink to="/auth/reset-password/confirm">Confirm Password</RouterLink>

                <UButton
                  icon={mode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'}
                  color="neutral"
                  variant="ghost"
                  onClick={() => {
                    mode.value = mode.value === 'dark' ? 'light' : 'dark'
                  }}
                />
              </nav>
            </div>
          </header>

          <RouterView />
        </div>
      </UApp>
    )
  },
})
