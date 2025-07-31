import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import UButton from '@nuxt/ui/components/Button.vue'

export default defineComponent({
  name: 'NotFoundView',
  setup() {
    return () => (
      <div class="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Decorative Blobs to match the theme */}
        <div class="absolute top-0 -left-32 w-96 h-96 bg-primary/20 rounded-full -z-0 blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 -right-32 w-96 h-96 bg-primary/30 rounded-full -z-0 blur-3xl animate-pulse [animation-delay:1s]"></div>

        <div class="relative z-10 flex flex-col items-center gap-6">
          <div class="text-[150px] font-bold text-primary leading-none md:text-[200px]">404</div>
          <h1 class="text-4xl font-semibold tracking-tight text-muted">Oops! Page Not Found</h1>
          <p class="text-lg text-dimmed max-w-md">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <div class="mt-6">
            <RouterLink to="/">
              <UButton
                label="Go Back Home"
                size="lg"
                trailingIcon="i-heroicons-arrow-right-20-solid"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    )
  },
})
