import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../hello-world'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    console.log(wrapper.html())
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('should update the message when props change (optional)', async () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Initial Message',
      },
    })

    expect(wrapper.text()).toContain('Initial Message')

    // Update the prop
    await wrapper.setProps({ msg: 'Updated Message' })

    // Assert that the component re-renders with the new message
    expect(wrapper.text()).toContain('Updated Message')
  })
})
