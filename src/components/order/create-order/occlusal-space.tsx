import { defineComponent, ref, reactive, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'
// import UIcon from '@nuxt/ui/components/Icon.vue'
import USeparator from '@nuxt/ui/components/Separator.vue'

export default defineComponent({
  name: 'OcclusalSpaceSelection',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    // Reactive state for each selection category
    const selectedOcclusalSpace = ref<
      'prepareTooth' | 'adjustOpposing' | 'adjustOcclusal' | 'contactMe' | null
    >('prepareTooth')
    const selectedGap = ref<'independent' | 'tighten' | null>('independent')
    const selectedProximalContact = ref<'normal' | 'tighten' | null>('normal')
    const selectedOcclusalContact = ref<'normal' | 'light' | 'none' | null>('normal')

    // Mathematical Model:
    // Let O be the set of Occlusal Space options, O = {o_1, o_2, o_3, o_4}.
    // Let G be the set of Gap options, G = {g_1, g_2}.
    // Let P be the set of Proximal Contact options, P = {p_1, p_2}.
    // Let C be the set of Occlusal Contact options, C = {c_1, c_2, c_3}.
    //
    // The selection process is a set of independent choices:
    // User selects o ∈ O.
    // User selects g ∈ G.
    // User selects p ∈ P.
    // User selects c ∈ C.
    //
    // All selections are mandatory before proceeding to the next step.

    // Options for each radio group
    const occlusalSpaceOptions = [
      { label: 'Prepare Tooth', value: 'prepareTooth' },
      { label: 'Adjust Opposing', value: 'adjustOpposing' },
      { label: 'Adjust Occlusal', value: 'adjustOcclusal' },
      { label: 'Contact Me', value: 'contactMe' },
    ]

    const gapOptions = [
      { label: 'Independent', value: 'independent' },
      { label: 'Tighten', value: 'tighten' },
    ]

    const proximalContactOptions = [
      { label: 'Normal', value: 'normal' },
      { label: 'Tighten', value: 'tighten' },
    ]

    const occlusalContactOptions = [
      { label: 'Normal', value: 'normal' },
      { label: 'Light', value: 'light' },
      { label: 'None', value: 'none' },
    ]

    const onNext = () => {
      // Validate all selections are made
      if (
        selectedOcclusalSpace.value &&
        selectedGap.value &&
        selectedProximalContact.value &&
        selectedOcclusalContact.value
      ) {
        emit('next-step', {
          occlusalSpace: selectedOcclusalSpace.value,
          gap: selectedGap.value,
          proximalContact: selectedProximalContact.value,
          occlusalContact: selectedOcclusalContact.value,
        })
      } else {
        // Optionally show a warning or error message to the user
        console.warn('Please make all selections before proceeding.')
      }
    }

    const onPrev = () => {
      emit('prev-step')
    }

    // Determine if the "Next Step" button should be disabled
    const isNextDisabled = computed(() => {
      return !(
        selectedOcclusalSpace.value &&
        selectedGap.value &&
        selectedProximalContact.value &&
        selectedOcclusalContact.value
      )
    })

    return () => (
      <div class="space-y-8">
        {/* Occlusal Space Selection */}
        <UFormGroup label="Occlusal Space">
          <URadioGroup
            v-model={selectedOcclusalSpace.value}
            items={occlusalSpaceOptions}
            orientation="horizontal"
            variant="card"
            size="sm"
          />
        </UFormGroup>

        <USeparator class="mb-6" />

        <div class="grid grid-cols-1 gap-8">
          {/* 外展隙 (Gap) */}
          <UFormGroup label="Gap">
            <div class="flex gap-4">
              {/* Independent Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedGap.value === 'independent' ? ' border-primary-500' : 'border-muted',
                ]}
                onClick={() => (selectedGap.value = 'independent')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedGap.value}
                  onUpdate:modelValue={() => (selectedGap.value = 'independent')}
                  items={[{ label: 'Independent', value: 'independent' }]}
                  orientation="horizontal"
                />
              </button>
              {/* Tighten Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedGap.value === 'tighten' ? 'border-primary-500' : 'border-muted',
                ]}
                onClick={() => (selectedGap.value = 'tighten')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedGap.value}
                  onUpdate:modelValue={() => (selectedGap.value = 'tighten')}
                  items={[{ label: 'Tighten', value: 'tighten' }]}
                  orientation="horizontal"
                />
              </button>
            </div>
          </UFormGroup>

          {/* 邻面接触 (Proximal Contact) */}
          <UFormGroup label="Proximal Contact">
            <div class="flex gap-4">
              {/* Normal Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedProximalContact.value === 'normal'
                    ? 'border-primary-500'
                    : 'border-muted',
                ]}
                onClick={() => (selectedProximalContact.value = 'normal')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedProximalContact.value}
                  onUpdate:modelValue={() => (selectedProximalContact.value = 'normal')}
                  items={[{ label: 'Normal', value: 'normal' }]}
                  orientation="horizontal"
                />
              </button>
              {/* Tighten Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedProximalContact.value === 'tighten'
                    ? 'border-primary-500'
                    : 'border-muted',
                ]}
                onClick={() => (selectedProximalContact.value = 'tighten')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedProximalContact.value}
                  onUpdate:modelValue={() => (selectedProximalContact.value = 'tighten')}
                  items={[{ label: 'Tighten', value: 'tighten' }]}
                  orientation="horizontal"
                />
              </button>
            </div>
          </UFormGroup>

          {/* 咬合接触 (Occlusal Contact) */}
          <UFormGroup label="Occlusal Contact">
            <div class="flex gap-4">
              {/* Normal Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedOcclusalContact.value === 'normal'
                    ? 'border-primary-500'
                    : 'border-muted',
                ]}
                onClick={() => (selectedOcclusalContact.value = 'normal')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedOcclusalContact.value}
                  onUpdate:modelValue={() => (selectedOcclusalContact.value = 'normal')}
                  items={[{ label: 'Normal', value: 'normal' }]}
                  orientation="horizontal"
                />
              </button>
              {/* Light Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedOcclusalContact.value === 'light' ? 'border-primary-500' : 'border-muted',
                ]}
                onClick={() => (selectedOcclusalContact.value = 'light')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedOcclusalContact.value}
                  onUpdate:modelValue={() => (selectedOcclusalContact.value = 'light')}
                  items={[{ label: 'Light', value: 'light' }]}
                  orientation="horizontal"
                />
              </button>
              {/* None Option */}
              <button
                type="button"
                class={[
                  'flex flex-col items-center gap-2 p-2 rounded-lg transition-colors duration-200 border min-w-32',
                  selectedOcclusalContact.value === 'none' ? 'border-primary-500' : 'border-muted',
                ]}
                onClick={() => (selectedOcclusalContact.value = 'none')}
              >
                <UButton variant="link" icon="i-lucide-lightbulb" size="sm" />
                <URadioGroup
                  modelValue={selectedOcclusalContact.value}
                  onUpdate:modelValue={() => (selectedOcclusalContact.value = 'none')}
                  items={[{ label: 'None', value: 'none' }]}
                  orientation="horizontal"
                />
              </button>
            </div>
          </UFormGroup>
        </div>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="Return" size="lg" variant="outline" onClick={onPrev} />
          <UButton label="Next Step" size="lg" disabled={isNextDisabled.value} onClick={onNext} />
        </div>
      </div>
    )
  },
})
