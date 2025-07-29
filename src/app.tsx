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
import { defaultLayout } from './router'
import { useRoute } from 'vue-router'
import DevMenu from '@/components/devtools/dev-menu'
import * as locales from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'
import ThemePickerPopover from './components/theme/theme-picker-popover'

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
    const route = useRoute()
    const { locale } = useI18n()

    const getNuxtUILocale = (langCode: string) =>
      locales[langCode as keyof typeof locales] ?? locales.en

    const currentLayoutComponent = computed(() => {
      const layoutName = (route.meta.layout || defaultLayout) as string
      return loadLayoutComponent(layoutName)
    })

    return () => {
      const Layout = currentLayoutComponent.value

      return (
        <UApp locale={getNuxtUILocale(locale.value)}>
          <div class={'fixed right-12 bottom-24'}>
            <ThemePickerPopover />
          </div>
          <div class={'fixed right-12 bottom-12'}>
            <DevMenu />
          </div>

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
