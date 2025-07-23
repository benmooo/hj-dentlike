import { defineComponent } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    return () => view
  },
})

const view = (
  <main>
    <div>
      <h1 class={'text-red-500'}>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      <UButton variant='soft' onClick={() => console.log('hello')}>Click Me</UButton>
    </div>
  </main>
)
