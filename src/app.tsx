import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import * as locales from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '@vueuse/core'
import ThemePickerPopover from './components/features/theme/theme-picker-popover'

export default defineComponent({
  name: 'App',
  setup() {
    const mode = useColorMode()
    const { locale } = useI18n()

    const getNuxtUILocale = (langCode: string) =>
      locales[langCode as keyof typeof locales] ?? locales.en

    const changeLocale = () => {
      locale.value = locale.value === 'en' ? 'zh_CN' : 'en'
    }

    const toggleTheme = () => {
      mode.value = mode.value === 'dark' ? 'light' : 'dark'
    }

    return () => (
      <UApp locale={getNuxtUILocale(locale.value)}>
        <div>
          <header>
            <div class="wrapper">
              <nav class={'flex gap-4 items-center'}>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>

                <RouterLink to="/auth/login">Login</RouterLink>
                <RouterLink to="/auth/signup">Signup</RouterLink>
                <RouterLink to="/auth/reset-password/verify-email">Reset Password</RouterLink>
                <RouterLink to="/auth/reset-password/verify-otp">Verify OTP</RouterLink>
                <RouterLink to="/auth/reset-password/confirm">Confirm Password</RouterLink>

                <UButton
                  icon={mode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'}
                  color="neutral"
                  variant="ghost"
                  onClick={toggleTheme}
                />
                <UButton
                  icon="i-lucide-globe"
                  color="neutral"
                  variant="ghost"
                  onClick={changeLocale}
                />

                <ThemePickerPopover />
              </nav>
            </div>
          </header>

          <RouterView />
        </div>
      </UApp>
    )
  },
})
