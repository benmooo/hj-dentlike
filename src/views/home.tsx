import { defineComponent } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UNavigationMenu from '@nuxt/ui/components/NavigationMenu.vue'
import Placeholder from '@/components/common/placeholder'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const navLinks = [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about', disabled: true },
      { label: 'Services', to: '/services', disabled: true },
      { label: 'Products', to: '/products', disabled: true },
      { label: 'Contact', to: '/contact', disabled: true },
    ]

    return () => (
      <div class="text-foreground min-h-screen">
        {/* Header */}
        <header class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sticky top-0 backdrop-blur-md z-50">
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-primary">Dentlike</div>
            <nav class="hidden md:flex items-center">
              <UNavigationMenu items={navLinks} highlight />
            </nav>
            <div class="flex items-center gap-4">
              <UButton label="Contact now" disabled />
              {/* Mobile menu button - can be implemented later */}
              <div class="md:hidden">
                <UButton icon="i-heroicons-bars-3" variant="ghost" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main class="relative">
          {/* Decorative Blobs */}
          <div class="absolute top-0 -left-32 w-96 h-96 bg-primary/5 rounded-full -z-10 blur-3xl"></div>
          <div class="absolute top-1/2 -right-32 w-96 h-96 bg-primary/10 rounded-full -z-10 blur-3xl"></div>

          <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 pb-24">
            <div class="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div class="flex flex-col gap-y-8">
                <div class="inline-flex items-center gap-x-2 bg-primary-50 dark:bg-primary-900/50 text-primary px-3 py-1 rounded-full text-sm font-medium w-fit shadow-sm">
                  <span>⭐</span>
                  <span>Easy dental product ordering</span>
                </div>
                <h1 class="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                  Dentlike
                  <br />
                  Creating Smiles
                  <br />
                  That Shine
                </h1>
                <p class="text-lg text-muted-foreground max-w-lg">
                  Dentlike provides expert dental care, personalized treatments, and advanced
                  solutions to help you achieve a healthy, confident smile.
                </p>
                <div class="flex flex-wrap items-center gap-4 mt-4">
                  <RouterLink to="/client/home">
                    <UButton label="Get Started →" size="lg" />
                  </RouterLink>
                  <RouterLink to="/auth/signup">
                    <UButton label="Join Us" variant="outline" size="lg" />
                  </RouterLink>
                </div>
                <div class="flex items-center gap-x-3 mt-16 text-muted-foreground text-sm">
                  <div class="w-7 h-11 border-2 border-muted-foreground/50 rounded-full flex items-center justify-center">
                    <div class="w-1 h-2 rounded-full bg-primary animate-bounce [animation-duration:1.5s]"></div>
                  </div>
                  <span>Scroll...</span>
                </div>
              </div>

              {/* Right Column */}
              <div class="relative w-full">
                <Placeholder class="aspect-[4/5] w-full shadow-2xl" />

                {/* "Our Professionals" card */}
                <div class="absolute -bottom-8 -left-16 bg-background/80 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-x-4 w-auto transform hover:scale-105 transition-transform duration-300">
                  <div class="flex -space-x-3">
                    <Placeholder class="w-12 h-12 rounded-full border-2 border-background" />
                    <Placeholder class="w-12 h-12 rounded-full border-2 border-background" />
                    <Placeholder class="w-12 h-12 rounded-full border-2 border-background" />
                    <Placeholder class="w-12 h-12 rounded-full border-2 border-background" />
                    <div class="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold border-2 border-background text-sm">
                      30+
                    </div>
                  </div>
                  <div class="pr-4">
                    <p class="font-semibold text-sm">Our Professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  },
})
