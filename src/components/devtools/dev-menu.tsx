import type { DropdownMenuItem } from '@nuxt/ui'
import { defineComponent, ref } from 'vue'
import UDropDownMenu from '@nuxt/ui/components/DropdownMenu.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DevMenu',
  setup() {
    const { locale } = useI18n()

    const changeLocale = () => {
      locale.value = locale.value === 'en' ? 'zh_CN' : 'en'
    }

    const items = ref<DropdownMenuItem[][]>([
      [
        {
          label: 'Home',
          to: '/',
          icon: 'i-lucide-home',
        },
        {
          label: 'About',
          to: '/about',
          icon: 'i-lucide-info',
        },
        {
          label: 'CHome',
          to: '/client/home',
          icon: 'i-lucide-layout',
        },
      ],
      [
        {
          label: 'Login',
          to: '/auth/login',
          icon: 'i-lucide-log-in',
        },
        {
          label: 'Signup',
          to: '/auth/signup',
          icon: 'i-lucide-user-plus',
        },
        {
          label: 'Reset Password',
          to: '/auth/reset-password/verify-email',
          icon: 'i-lucide-key',
        },
        {
          label: 'Verify OTP',
          to: '/auth/reset-password/verify-otp',
          icon: 'i-lucide-shield-check',
        },
        {
          label: 'Confirm Password',
          to: '/auth/reset-password/confirm',
          icon: 'i-lucide-check-circle',
        },
      ],
      [
        {
          label: 'Change Locale',
          icon: 'i-lucide-globe',
          onSelect: changeLocale,
        },
      ],
    ])

    return () => (
      <UDropDownMenu size="sm" items={items.value} ui={{ content: 'w-48' }}>
        <UButton icon="i-lucide-circle-help" variant="solid" class={'rounded-full'} size="sm" />
      </UDropDownMenu>
    )
  },
})
