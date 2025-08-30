import Chat from '@/components/chat/chat'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div class="max-w-4xl">
        <Chat />
      </div>
    )
  },
})
