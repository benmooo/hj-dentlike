import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaceholderComponent',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={[
          'relative overflow-hidden rounded-sm border border-dashed border-accented opacity-75 px-4 flex items-center justify-center',
          props.class,
        ]}
      >
        <svg class="absolute inset-0 h-full w-full stroke-inverted/20" fill="none">
          <defs>
            <pattern
              id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
            width="100%"
            height="100%"
          ></rect>
        </svg>
        {slots.default ? slots.default() : null}
      </div>
    )
  },
})
