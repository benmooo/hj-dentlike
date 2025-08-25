import Placeholder from '@/components/common/placeholder'
import Bills from '@/components/finance/bills'
import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => (
    <div>
      {/*<Placeholder class="w-full aspect-video" />*/}
      <Bills />
    </div>
  )
})
