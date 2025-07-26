import { defineComponent, reactive } from 'vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UIcon from '@nuxt/ui/components/Icon.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { loginPayload, type LoginPayload } from './types'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import StyledRouterLink, {
  routerLinkStylePrimary,
} from '@/components/features/common/styled-router-link'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const state = reactive({ email: '', password: '' })

    const { t } = useI18n()

    // const toast = useToast()
    const onSubmit = (event: FormSubmitEvent<LoginPayload>) => {
      console.log('Form submitted with:', event.data)
      alert(
        `Logging in with:\nEmail: ${state.email}\nPassword: ${'*'.repeat(state.password.length)}`,
      )
    }

    const clearEmail = () => {
      state.email = ''
    }

    return () => (
      <div class="min-h-screen flex">
        {/* Left branding column - hidden on screens smaller than lg */}
        <div class="w-1/2 hidden lg:flex items-center justify-center bg-neutral-50 dark:bg-neutral-800/50 p-12 relative overflow-hidden">
          {/* Decorative background shapes */}
          <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />
          <div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />

          <div class="max-w-md z-10">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
              Your Smile, Our Passion, {t('app.name')}
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
              <h1 class="text-3xl font-bold tracking-tight">{t('loginPage.title')}</h1>
              <p class="mt-2 text-sm text-muted">{t('loginPage.subtitle')}</p>
            </div>

            <UForm state={state} schema={loginPayload} onSubmit={onSubmit} class="space-y-6">
              <UFormField label={t('loginPage.emailLabel')} name="email" required>
                <UInput
                  v-model={state.email}
                  leadingIcon="i-heroicons-envelope"
                  placeholder="you@example.com"
                  size="lg"
                  class={'w-full'}
                  // loading
                  loading-icon="i-lucide-loader"
                  ui={{ trailing: 'pe-1' }}
                >
                  {{
                    trailing: () =>
                      state.email.length > 0 && (
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          icon="i-lucide-circle-x"
                          aria-label="Clear input"
                          onClick={clearEmail}
                        />
                      ),
                  }}
                </UInput>
              </UFormField>

              <UFormField label={t('loginPage.passwordLabel')} name="password" required>
                <UInput
                  v-model={state.password}
                  type="password"
                  icon="i-heroicons-lock-closed"
                  placeholder="Enter your password"
                  size="lg"
                  class={'w-full'}
                  // ui={{ icon: { trailing: { pointer: '' } } }}
                />
              </UFormField>

              <div class="flex items-center justify-end">
                {/* <UCheckbox v-model={state.remember} name="remember" label="Remember me" /> */}
                <div class="text-sm">
                  <a href="#" class="text-primary-600 hover:text-primary-500">
                    {t('loginPage.forgotPassword')}
                  </a>
                </div>
              </div>

              <UButton
                type="submit"
                color="primary"
                block
                size="lg"
                label={t('loginPage.loginButton')}
              />

              <div class="my-6 flex items-center">
                <div class="w-full border-t border-muted" />
                <div class="text-sm px-2 text-muted flex-shrink-0">Or continue with</div>
                <div class="w-full border-t border-muted" />
              </div>

              <UButton
                icon="i-logos-google-icon"
                label="Sign in with Google"
                variant="outline"
                block
                size="lg"
              />
            </UForm>

            <p class="mt-8 text-sm text-center text-dimmed">
              {t('loginPage.haveNoAccount')}{' '}
              <StyledRouterLink to="/auth/signup" class={routerLinkStylePrimary}>
                {t('loginPage.signUpLink')}
              </StyledRouterLink>
            </p>
          </div>
        </div>
      </div>
    )
  },
})
