import { defineComponent, reactive } from 'vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UPinInput from '@nuxt/ui/components/PinInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { otpSchema, type OTPSchema } from './types'
import { RouterLink, useRouter } from 'vue-router'
import StyledRouterLink, {
  routerLinkStyleMuted,
} from '@/components/features/common/styled-router-link'

export default defineComponent({
  name: 'VerifyOtpPage',
  setup() {
    const state = reactive({
      otp: [] as number[],
    })

    const router = useRouter()

    const onSubmit = (event: FormSubmitEvent<OTPSchema>) => {
      console.log('Verifying OTP:', event.data.otp)
      alert(`OTP ${state.otp} verified successfully!`)
      // Add real API call and navigate to next step here
      router.push('/auth/reset-password/confirm')
    }

    const handleResend = () => {
      alert('A new verification code has been sent to your email address.')
      // Add real resend API call here
    }

    return () => (
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-sm">
          <div class="flex flex-col items-center mb-6">
            <UButton
              icon="i-lucide-message-square-more"
              variant="ghost"
              color="neutral"
              size="xl"
              disabled
            />

            <h1 class="text-2xl font-semibold mb-2">Check your email</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
              We've sent a 6-digit verification code. Please enter it below to continue.
            </p>
          </div>

          <UForm
            state={state}
            schema={otpSchema}
            validateOn={['blur']}
            onSubmit={onSubmit}
            class="space-y-4"
          >
            <UFormField label="Verification Code" name="otp" required>
              <UPinInput
                v-model={state.otp}
                color="neutral"
                size="xl"
                variant="subtle"
                placeholder="○"
                type="number"
                length={6}
              />
            </UFormField>

            <UButton type="submit" color="primary" block size="lg" label="Verify" />

            <div class="text-sm text-center text-gray-600">
              Didn't receive the code?{' '}
              <UButton variant="link" class="p-0 align-baseline" onClick={handleResend}>
                Resend code
              </UButton>
            </div>

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
