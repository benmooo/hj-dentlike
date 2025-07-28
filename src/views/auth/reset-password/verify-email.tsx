import { defineComponent, reactive } from 'vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UIcon from '@nuxt/ui/components/Icon.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { emailSchema, type EmailSchema } from './types'
import { RouterLink, useRouter } from 'vue-router'
import StyledRouterLink, { routerLinkStyleMuted } from '@/components/common/styled-router-link'

export default defineComponent({
  name: 'VerifyEmailPage',
  setup() {
    const state = reactive({
      email: '',
    })

    const router = useRouter()

    const onSubmit = (event: FormSubmitEvent<EmailSchema>) => {
      console.log('Form submitted with:', event.data)
      alert(`Reset instructions will be sent to: ${state.email}`)
      router.push('/auth/reset-password/verify-otp')
    }

    return () => (
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-sm">
          <div class="flex flex-col items-center mb-6">
            <UButton icon="i-lucide-key-round" variant="ghost" color="neutral" size="xl" disabled />

            <h1 class="text-2xl font-semibold mb-2">Forgot password?</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
              No worries, we&#39;ll send you reset instructions.
            </p>
          </div>

          <UForm state={state} schema={emailSchema} onSubmit={onSubmit} class="space-y-4">
            <UFormField label="Email" name="email" required>
              <UInput
                v-model={state.email}
                placeholder="Enter your email"
                size="lg"
                class="w-full"
                leadingIcon="i-heroicons-envelope"
                autocomplete="email"
                type="email"
              />
            </UFormField>

            <UButton type="submit" color="primary" block size="lg" label="Reset password" />

            <div class="text-center mt-4 text-sm">
              <StyledRouterLink to="/auth/login" class={routerLinkStyleMuted}>
                Back to Sign In
              </StyledRouterLink>
            </div>
          </UForm>
        </div>
      </div>
    )
  },
})
