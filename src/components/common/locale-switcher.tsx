import { computed, defineComponent, ref } from 'vue'
import UDropdown from '@nuxt/ui/components/DropdownMenu.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import type { DropdownMenuItem } from '@nuxt/ui/components/DropdownMenu.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocaleSwitcher',
  setup() {
    const { locale } = useI18n()

    const changeLocale = (l: string) => () => {
      if (l !== locale.value) {
        locale.value = l
      }
    }

    const items = computed(() => [
      [
        {
          label: 'English',
          icon: 'i-lucide-case-sensitive',
          onSelect: changeLocale('en'),
          checked: locale.value === 'en',
          type: 'checkbox',
        },
        {
          label: '中文',
          icon: 'i-lucide-languages',
          onSelect: changeLocale('zh_CN'),
          checked: locale.value === 'zh_CN',
          type: 'checkbox',
        },
      ],
    ])

    return () => (
      <UDropdown arrow items={items.value}>
        <UButton variant="ghost" size="sm" icon="i-lucide-globe"></UButton>
      </UDropdown>
    )
  },
})
