import { defineComponent, Transition } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  setup(_, { slots }) {
    return () => (
      <div>
        {slots.default?.()}
        {/* <footer class="footer">
          <small>© 2024 Company Name -- default layout</small>
        </footer> */}
      </div>
    )
  },
})
