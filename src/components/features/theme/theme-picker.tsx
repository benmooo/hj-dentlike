import { defineComponent, reactive } from 'vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import { useColorMode } from '@vueuse/core'

const PRIMARY_COLORS = [
  { name: 'Black', value: 'black' },
  { name: 'Red', value: 'red' },
  { name: 'Orange', value: 'orange' },
  { name: 'Amber', value: 'amber' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Lime', value: 'lime' },
  { name: 'Green', value: 'green' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Teal', value: 'teal' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Sky', value: 'sky' },
  { name: 'Blue', value: 'blue' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Violet', value: 'violet' },
  { name: 'Purple', value: 'purple' },
  { name: 'Fuchsia', value: 'fuchsia' },
  { name: 'Pink', value: 'pink' },
  { name: 'Rose', value: 'rose' },
]

const NEUTRAL_COLORS = [
  { name: 'Slate', value: 'slate' },
  { name: 'Gray', value: 'gray' },
  { name: 'Zinc', value: 'zinc' },
  { name: 'Neutral', value: 'neutral' },
  { name: 'Stone', value: 'stone' },
]

const RADIUS_VALUES = [
  { label: '0', value: '0rem' },
  { label: '0.125', value: '0.125rem' },
  { label: '0.25', value: '0.25rem' },
  { label: '0.375', value: '0.375rem' },
  { label: '0.5', value: '0.5rem' },
]

const THEME_MODES = [
  { label: 'Light', value: 'light', icon: 'i-heroicons-sun-20-solid' },
  { label: 'Dark', value: 'dark', icon: 'i-heroicons-moon-20-solid' },
  { label: 'System', value: 'auto', icon: 'i-heroicons-computer-desktop-20-solid' },
]

const colorClasses: Record<string, string> = {
  black: 'bg-black',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  slate: 'bg-slate-500',
  gray: 'bg-gray-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500',
}

export default defineComponent({
  name: 'ThemePicker',
  setup() {
    const colorMode = useColorMode()
    const appConfig = useAppConfig()

    const state = reactive({
      primaryColor: appConfig.ui.colors.primary || 'lime',
      neutralColor: appConfig.ui.colors.neutral || 'zinc',
      radius: document.documentElement.style.getPropertyValue('--ui-radius') || '0rem',
      themeMode: colorMode.value || 'auto',
    })

    const setPrimaryColor = (color: string) => {
      appConfig.ui.colors.primary = color
      state.primaryColor = color
    }

    const setNeutralColor = (color: string) => {
      appConfig.ui.colors.neutral = color
      state.neutralColor = color
    }

    const setRadius = (radius: string) => {
      document.documentElement.style.setProperty('--ui-radius', radius)
      state.radius = radius
    }

    const setThemeMode = (mode: 'light' | 'dark' | 'auto') => {
      colorMode.value = mode
      state.themeMode = mode
    }

    return () => (
      <UCard>
        <div class="space-y-4 -my-2 w-64">
          <div>
            <h3 class="text-xs mb-2 font-semibold">Primary</h3>
            <div class="grid grid-cols-3 gap-1 -mx-2">
              {PRIMARY_COLORS.map(({ name, value }) => (
                <UButton
                  key={`primary-${value}`}
                  color="neutral"
                  size="sm"
                  variant={state.primaryColor === value ? 'soft' : 'outline'}
                  onClick={() => setPrimaryColor(value)}
                  aria-label={`Select primary color ${name}`}
                >
                  <span class={['w-2 h-2 rounded-full mr-1', colorClasses[value]]}></span>
                  <span class={'truncate'}>{name}</span>
                </UButton>
              ))}
            </div>
          </div>

          <div>
            <h3 class="text-xs mb-2 font-semibold">Neutral</h3>
            <div class="grid grid-cols-3 gap-1 -mx-2">
              {NEUTRAL_COLORS.map(({ name, value }) => (
                <UButton
                  key={`neutral-${value}`}
                  color="neutral"
                  size="sm"
                  variant={state.neutralColor === value ? 'soft' : 'outline'}
                  onClick={() => setNeutralColor(value)}
                >
                  <span class={['w-2 h-2 rounded-full mr-1', colorClasses[value]]}></span>
                  <span class={'truncate'}>{name}</span>
                </UButton>
              ))}
            </div>
          </div>

          <div>
            <h3 class="text-xs mb-2 font-semibold">Radius</h3>
            <div class="flex items-center gap-1 -mx-2">
              {RADIUS_VALUES.map(({ label, value }) => (
                <UButton
                  key={`radius-${label}`}
                  color="neutral"
                  variant={state.radius === value ? 'soft' : 'outline'}
                  onClick={() => setRadius(value)}
                  class={'flex-1 justify-center px-0'}
                >
                  {label}
                </UButton>
              ))}
            </div>
          </div>

          <div>
            <h3 class="text-xs mb-2 font-semibold">Theme</h3>
            <div class="flex items-center gap-1 -mx-2">
              {THEME_MODES.map(({ label, value, icon }) => (
                <UButton
                  key={`theme-${value}`}
                  size="sm"
                  color="neutral"
                  variant={state.themeMode === value ? 'soft' : 'outline'}
                  icon={icon}
                  label={label}
                  onClick={() => setThemeMode(value as 'light' | 'dark' | 'auto')}
                  class={'flex-1'}
                />
              ))}
            </div>
          </div>
        </div>
      </UCard>
    )
  },
})
