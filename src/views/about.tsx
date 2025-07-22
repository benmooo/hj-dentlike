import { defineComponent } from "vue"

export default defineComponent({
  name: 'AboutView',
  setup() {
    return () => (
      <div class="about">
        <h1>This is an about page</h1>
      </div>
    )
  },
})
