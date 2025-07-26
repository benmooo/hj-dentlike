import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormSubmitEvent } from '@nuxt/ui'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import USelectMenu from '@nuxt/ui/components/SelectMenu.vue'
import { signupPayload, type SignupPayload } from './types'
import { RouterLink, useRouter } from 'vue-router'
import StyledRouterLink, {
  routerLinkStyleMuted,
  routerLinkStylePrimary,
} from '@/components/features/common/styled-router-link'

export default defineComponent({
  name: 'SignupPage',
  setup() {
    const { t } = useI18n()

    const state = reactive({
      name: '',
      email: '',
      phoneNumber: '',
      practiceName: '',
      password: '',
      passwordConfirmation: '',
      address: '',
      suburb: '',
      state: '',
      postcode: '',
      country: undefined,
    })

    const countries = [
      { label: 'Australia', value: 'AU' },
      { label: 'Canada', value: 'CA' },
      { label: 'China', value: 'CN' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' },
    ]

    const router = useRouter()

    const onSubmit = (event: FormSubmitEvent<SignupPayload>) => {
      console.log('Form submitted with:', event.data)
      alert('Account created successfully!')

      router.push('/auth/login')
    }

    return () => (
      <div class="min-h-screen flex">
        {/* Left branding column - hidden on screens smaller than lg */}
        <div class="w-1/3 hidden lg:flex items-center justify-center bg-neutral-50 dark:bg-neutral-800/50 p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />
          <div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/50 opacity-50" />
          <div class="max-w-md z-10">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
              {t('signupPage.sidePanelTitle')}
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t('signupPage.sidePanelSubtitle')}
            </p>
          </div>
        </div>

        {/* Right form column */}
        <div class="w-full lg:w-2/3 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
          <div class="w-full max-w-3xl">
            <div class="text-center lg:text-left mb-10">
              <h1 class="text-3xl font-bold tracking-tight">{t('signupPage.title')}</h1>
              <p class="mt-2 text-sm text-muted">{t('signupPage.subtitle')}</p>
            </div>

            <UForm
              state={state}
              schema={signupPayload}
              onSubmit={onSubmit}
              class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
              // class="flex "
            >
              <UFormField label={t('signupPage.nameLabel')} name="name" required>
                <UInput v-model={state.name} placeholder="Your Name" size="lg" class={'w-full'} />
              </UFormField>

              <UFormField label={t('signupPage.suburbLabel')} name="suburb" required>
                <UInput v-model={state.suburb} placeholder="Suburb" size="lg" class={'w-full'} />
              </UFormField>

              <UFormField label={t('signupPage.emailLabel')} name="email" required>
                <UInput
                  v-model={state.email}
                  placeholder="you@example.com"
                  size="lg"
                  icon="i-heroicons-envelope"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField
                label={t('signupPage.addressLabel')}
                name="address"
                required
                class="md:row-span-2"
              >
                <UTextarea
                  v-model={state.address}
                  placeholder="Street Address"
                  size="lg"
                  // autoresize:rows="5"
                  rows={5}
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.phoneLabel')} name="phoneNumber" required>
                <UInput
                  v-model={state.phoneNumber}
                  placeholder="Phone Number"
                  size="lg"
                  icon="i-heroicons-phone"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.practiceNameLabel')} name="practiceName" required>
                <UInput
                  v-model={state.practiceName}
                  placeholder="Practice Name"
                  size="lg"
                  icon="i-heroicons-building-office-2"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.countryLabel')} name="country" required>
                <USelectMenu
                  v-model={state.country}
                  items={countries}
                  placeholder="Select country"
                  size="lg"
                  value-attribute="value"
                  option-attribute="label"
                  // searchable
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.passwordLabel')} name="password" required>
                <UInput
                  v-model={state.password}
                  type="password"
                  placeholder="Create a password"
                  size="lg"
                  icon="i-heroicons-lock-closed"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.stateLabel')} name="state" required>
                <UInput
                  v-model={state.state}
                  placeholder="State / Province"
                  size="lg"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField
                label={t('signupPage.passwordConfirmationLabel')}
                name="passwordConfirmation"
                required
              >
                <UInput
                  v-model={state.passwordConfirmation}
                  type="password"
                  placeholder="Confirm password"
                  size="lg"
                  icon="i-heroicons-lock-closed"
                  class={'w-full'}
                />
              </UFormField>

              <UFormField label={t('signupPage.postcodeLabel')} name="postcode" required>
                <UInput
                  v-model={state.postcode}
                  placeholder="Post code / Zip code"
                  size="lg"
                  class={'w-full'}
                />
              </UFormField>

              {/* --- Actions --- */}
              <div class="md:col-span-2 mt-4">
                <UButton
                  type="submit"
                  color="primary"
                  block
                  size="lg"
                  label={t('signupPage.submitButton')}
                />
              </div>

              <p class="md:col-span-2 mt-4 text-sm text-center text-dimmed">
                {t('signupPage.haveAccount')}{' '}
                <StyledRouterLink to="/auth/login" class={routerLinkStylePrimary}>
                  {t('signupPage.loginLink')}
                </StyledRouterLink>
              </p>
            </UForm>
          </div>
        </div>
      </div>
    )
  },
})
