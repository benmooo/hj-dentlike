import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UIcon from '@nuxt/ui/components/Icon.vue'

describe('UIcon', () => {
  it('renders properly', () => {
    const wrapper = mount(UIcon, { props: { mode: 'css', name: 'i-lucide-lightbulb' } })
    console.log(wrapper.html())
    // expect(wrapper.text()).toContain('lucide')
  })
})
