import { defineComponent, reactive } from 'vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { resetPasswordPayload, type ResetPasswordPayload } from './types'
import { RouterLink } from 'vue-router'
import StyledRouterLink, {
    routerLinkStyleMuted,
  routerLinkStylePrimary,
} from '@/components/features/common/styled-router-link'

export default defineComponent({
  name: 'ResetPasswordConfirmPage',
  setup() {
    const state = reactive({
      password: '',
      passwordConfirm: '',
    })

    // In a real application, you would use Nuxt's useRouter()
    // const router = useRouter()

    const onSubmit = (event: FormSubmitEvent<ResetPasswordPayload>) => {
      console.log('New password submitted:', event.data.password)
      // Here you would call the API to update the password.
      // On success, navigate the user to the login page.
      alert(
        'Your password has been reset successfully! You can now sign in with your new password.',
      )
      // For demonstration, let's assume navigation after success.
      // router.push('/auth/login')
    }

    return () => (
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-sm">
          <div class="flex flex-col items-center mb-6">
            <UButton icon="i-lucide-key-round" variant="ghost" color="neutral" size="xl" disabled />
            <h1 class="text-3xl font-bold tracking-tight mb-2">Set a New Password</h1>
            <p class="text-sm text-muted text-center mb-4">
              Your new password must be at least 8 characters long.
            </p>
          </div>

          <UForm state={state} schema={resetPasswordPayload} onSubmit={onSubmit} class="space-y-6">
            <UFormField label="New Password" name="password" required>
              <UInput
                v-model={state.password}
                type="password"
                placeholder="Enter new password"
                size="lg"
                class={'w-full'}
                icon="i-heroicons-lock-closed"
              />
            </UFormField>

            <UFormField label="Confirm New Password" name="passwordConfirm" required>
              <UInput
                v-model={state.passwordConfirm}
                type="password"
                placeholder="Confirm your new password"
                size="lg"
                class={'w-full'}
                icon="i-heroicons-lock-closed"
              />
            </UFormField>

            <UButton type="submit" color="primary" block size="lg" label="Reset Password" />

            <div class="text-sm text-center">
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
