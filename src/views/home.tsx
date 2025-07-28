import { defineComponent } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import Sidebar from '@/components/sidebar/sidebar'

export default defineComponent({
  name: 'HomeView',
  setup() {
    return () => view
  },
})

const view = (
  <div class={'flex'}>
    <aside class={'max-h-screen overflow-y-auto'}>
      <Sidebar />
    </aside>

    <main class={'max-h-screen w-full overflow-y-scroll'}>
      <div>
        <div>hello</div>
      </div>
    </main>
  </div>
)
