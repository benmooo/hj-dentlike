import { defineComponent, ref, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue' // Used for conceptual grouping
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue' // For consistent form labeling

export default defineComponent({
  name: 'ImplantSelection',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    const selectedImplantSystem = ref<string | null>(null)
    const manualImplantInput = ref<string>('')

    const selectedImplant = ref<'straumann' | 'osstem' | 'biocomet' | 'manual' | null>('straumann')

    const implantOptions = [
      { label: '士卓曼', value: 'straumann', description: 'Straumann Implant System' },
      { label: '奥齿康', value: 'osstem', description: 'Osstem Implant System' },
      { label: '百康特', value: 'biocomet', description: 'Biocomet Implant System' },
      { label: '手动填写', value: 'manual', description: 'Manual Implant System' },
    ]

    // Mathematical Model:
    // Let S be the set of possible implant system selections,
    // S = { 'straumann', 'osstem', 'biocomet', 'manual' }.
    // Let s_current ∈ S be the currently selected system.
    // Let I_manual be the string input by the user if s_current = 'manual'.
    //
    // The component state is (s_current, I_manual).
    //
    // Constraints for 'Next Step' button:
    // is_next_disabled = (s_current is null) OR (s_current = 'manual' AND I_manual is empty)
    //
    // On 'Next Step' click:
    // Emits { system: s_current, manual_input: I_manual if s_current = 'manual' else null }

    const isNextDisabled = computed(() => {
      if (!selectedImplantSystem.value) {
        return true
      }
      if (selectedImplantSystem.value === 'manual' && manualImplantInput.value.trim() === '') {
        return true
      }
      return false
    })

    const handleSelectImplant = (value: string) => {
      selectedImplantSystem.value = value
      // Clear manual input if a predefined option is selected
      if (value !== 'manual') {
        manualImplantInput.value = ''
      }
    }

    const onNext = () => {
      if (!isNextDisabled.value) {
        emit('next-step', {
          implantSystem: selectedImplantSystem.value,
          manualImplantName:
            selectedImplantSystem.value === 'manual' ? manualImplantInput.value.trim() : null,
        })
      }
    }

    const onPrev = () => {
      emit('prev-step')
    }

    return () => (
      <div class="space-y-8">
        {/* Implant System Options */}
        <UFormGroup label="Implant Options">
          <URadioGroup
            v-model={selectedImplant.value}
            items={implantOptions}
            // orientation="horizontal"
            variant="table"
          />
        </UFormGroup>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="Return" size="lg" variant="outline" onClick={onPrev} />
          <UButton label="Next Step" size="lg" disabled={isNextDisabled.value} onClick={onNext} />
        </div>
      </div>
    )
  },
})
