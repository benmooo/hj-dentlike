import { defineComponent } from 'vue'
import USwitch from '@nuxt/ui/components/Switch.vue'
import { useColorMode } from '@vueuse/core'

export default defineComponent({
  setup() {
    const colorMode = useColorMode()

    const onChange = (value: boolean) => {
      colorMode.value = value ? 'light' : 'dark'
    }

    return () => (
      <USwitch
        uncheckedIcon="i-lucide-moon"
        checkedIcon="i-lucide-sun"
        modelValue={colorMode.value === 'light'}
        onUpdate:modelValue={onChange}
      />
    )
  },
})
