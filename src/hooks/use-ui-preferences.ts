import { onMounted } from 'vue'

export function useUiPreferences() {
  const appConfig = useAppConfig()

  onMounted(() => {
    const primaryColor = localStorage.getItem('nuxtui-primary-color')
    const neutralColor = localStorage.getItem('nuxtui-neutral-color')
    const radius = localStorage.getItem('nuxtui-radius')

    if (primaryColor) appConfig.ui.colors.primary = primaryColor
    if (neutralColor) appConfig.ui.colors.neutral = neutralColor
    if (radius) {
      appConfig.ui.radius = radius
      document.documentElement.style.setProperty('--ui-radius', radius)
    }
  })
}
