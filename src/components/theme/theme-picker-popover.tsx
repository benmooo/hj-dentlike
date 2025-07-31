import { defineComponent, ref } from 'vue'
import UPopover from '@nuxt/ui/components/Popover.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import ThemePicker from './theme-picker'

export default defineComponent({
  name: 'ThemePickerPopover',

  setup() {
    const open = ref(false)

    const onClick = () => {
      open.value = !open.value
    }

    return () => (
      <UPopover
        arrow
        open={open.value}
        onUpdate:open={(value) => (open.value = value)}
        content={{ sideOffset: 4 }}
      >
        {{
          default: () => null,
          anchor: () => (
            <UButton
              icon="i-lucide-swatch-book"
              onClick={onClick}
              variant='ghost'
              size='sm'
            ></UButton>
          ),
          content: () => <ThemePicker />,
        }}
      </UPopover>
    )
  },
})
