import { defineComponent, ref } from 'vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'

export default defineComponent({
  name: 'ModernLoginPage',
  setup() {
    const state = ref({
      email: '',
      password: '',
      remember: false,
    })

    // This is a placeholder for form submission logic.
    function onSubmit(event: object) {
      console.log(typeof event)
      console.log('Form submitted with:', event.data)
      alert(
        `Logging in with:\nEmail: ${state.value.email}\nPassword: ${'*'.repeat(state.value.password.length)}`,
      )
    }

    return () => (
      <div class="min-h-screen flex text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
        {/* Left branding column - hidden on screens smaller than lg */}
        <div class="w-1/2 hidden lg:flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-12 relative overflow-hidden">
          {/* Decorative background shapes */}
          <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />
          <div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />

          <div class="max-w-md z-10">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
              Your Smile, Our Passion
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Access your personalized dental care plan and connect with top specialists. We're
              committed to providing you with the best dental experience.
            </p>
          </div>
        </div>

        {/* Right form column */}
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div class="w-full max-w-md">
            <div class="text-center lg:text-left mb-10">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please enter your credentials to sign in.
              </p>
            </div>

            <UForm state={state.value} onSubmit={onSubmit} class="space-y-6">
              <UFormField label="Email address" name="email" required>
                <UInput
                  v-model={state.value.email}
                  icon="i-heroicons-envelope"
                  placeholder="you@example.com"
                  size="lg"
                  class={'w-full'}
                  // ui={{ icon: { trailing: { pointer: '' } } }}
                />
              </UFormField>

              <UFormField label="Password" name="password" required>
                <UInput
                  v-model={state.value.password}
                  type="password"
                  icon="i-heroicons-lock-closed"
                  placeholder="Enter your password"
                  size="lg"
                  class={'w-full'}
                  // ui={{ icon: { trailing: { pointer: '' } } }}
                />
              </UFormField>

              <div class="flex items-center justify-between">
                <UCheckbox v-model={state.value.remember} name="remember" label="Remember me" />
                <div class="text-sm">
                  <a href="#" class="font-semibold text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <UButton type="submit" color="primary" block size="lg" label="Sign In" />

              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <UButton
                icon="i-logos-google-icon"
                label="Sign in with Google"
                variant="outline"
                // color="gray"
                block
                size="lg"
              />
            </UForm>

            <p class="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <a href="#" class="font-semibold text-primary-600 hover:text-primary-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  },
})
