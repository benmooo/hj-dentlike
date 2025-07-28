import { RouterLink, RouterView, type RouteLocationNormalizedLoaded } from 'vue-router'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  Transition,
  type VNode,
  type Component,
} from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import * as locales from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '@vueuse/core'
import ThemePickerPopover from './components/theme/theme-picker-popover'
import { defaultLayout } from './router'
import { useRoute } from 'vue-router'

// Cache for dynamically loaded layout components.
// This prevents the layout component from being recreated on every route change,
// which in turn preserves the state of the <Transition> component.
const layoutCache: Record<string, Component> = {}

const loadLayoutComponent = (layoutName: string) => {
  if (layoutCache[layoutName]) {
    return layoutCache[layoutName]
  }

  const component = defineAsyncComponent(() => import(`@/components/layout/${layoutName}.tsx`))
  layoutCache[layoutName] = component
  return component
}

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

    const route = useRoute()

    const currentLayoutComponent = computed(() => {
      const layoutName = (route.meta.layout || defaultLayout) as string
      return loadLayoutComponent(layoutName)
    })

    return () => {
      const Layout = currentLayoutComponent.value

      return (
        <UApp locale={getNuxtUILocale(locale.value)}>
          <header>
            <div class="wrapper">
              <nav class={'flex gap-4 items-center'}>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/client/home">CHome</RouterLink>

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

          <Layout>
            <RouterView>{{ default: withPageTransition('slide-left') }}</RouterView>
          </Layout>
        </UApp>
      )
    }
  },
})

const withPageTransition =
  (
    transitionName: string,
    duration: { enter: number; leave: number } = { enter: 500, leave: 300 },
  ) =>
  ({ Component, route }: { Component: () => VNode; route: RouteLocationNormalizedLoaded }) => {
    if (!Component) return null
    return (
      <Transition name={transitionName} type="transition" duration={duration}>
        <Component key={route.path} />
      </Transition>
    )
  }
