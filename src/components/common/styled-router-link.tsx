import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'StyledRouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => (
      <RouterLink to={props.to} class={props.class}>
        {slots.default ? slots.default() : ''}
      </RouterLink>
    )
  },
})

export const routerLinkStylePrimary = 'font-semibold text-primary-600 hover:text-primary-500'
export const routerLinkStyleMuted = 'text-muted hover:text-primary-500'
