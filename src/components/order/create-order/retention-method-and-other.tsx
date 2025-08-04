import { defineComponent, ref, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'

export default defineComponent({
  name: 'RetentionMethodAndOther',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    const selectedRetentionMethod = ref<string | null>(null)
    const selectedAbutmentPosition = ref<string | null>(null)
    const selectedAbutmentMaterial = ref<string | null>(null)
    const manualMaterialInput = ref<string>('')

    // Define options for each radio group
    const retentionMethodOptions = [
      {
        label: 'Screw Retained',
        value: 'screw_retained',
      },
      {
        label: 'Intra-oral Cementation with Screw Channel',
        value: 'intra_oral_cement_screw_channel',
      },
      {
        label: 'Intra-oral Cementation without Screw Channel',
        value: 'intra_oral_cement_no_screw_channel',
      },
    ]

    const abutmentPositionOptions = [
      {
        label: 'Angled Screw Channel',
        value: 'angled_screw_channel',
      },
      {
        label: 'Cement Retained',
        value: 'cement_retained',
      },
      {
        label: 'Contact Me',
        value: 'contact_me',
      },
    ]

    const abutmentMaterialOptions = [
      { label: 'Custom Abutment', value: 'custom_abutment' },
      { label: 'Titanium Base', value: 'titanium_base' },
      {
        label: 'Please fill in other materials',
        value: 'manual',
      },
    ]

    // Mathematical Model:
    // Let R be the set of possible retention method selections,
    // R = { 'screw_retained', 'intra_oral_cement_screw_channel', 'intra_oral_cement_no_screw_channel' }.
    // Let P be the set of possible abutment position selections,
    // P = { 'angled_screw_channel', 'cement_retained', 'contact_me' }.
    // Let M be the set of possible abutment material selections,
    // M = { 'custom_abutment', 'titanium_base', 'manual' }.
    //
    // Let r_current ∈ R be the currently selected retention method.
    // Let p_current ∈ P be the currently selected abutment position.
    // Let m_current ∈ M be the currently selected abutment material.
    // Let I_manual_material be the string input by the user if m_current = 'manual'.
    //
    // The component state is (r_current, p_current, m_current, I_manual_material).
    //
    // Constraints for 'Next Step' button:
    // is_next_disabled = (r_current is null) OR
    //                    (p_current is null) OR
    //                    (m_current is null) OR
    //                    (m_current = 'manual' AND I_manual_material is empty)
    //
    // On 'Next Step' click:
    // Emits {
    //   retentionMethod: r_current,
    //   abutmentPosition: p_current,
    //   abutmentMaterial: m_current,
    //   manualMaterialName: I_manual_material if m_current = 'manual' else null
    // }

    const isNextDisabled = computed(() => {
      // All radio groups must have a selection
      if (
        !selectedRetentionMethod.value ||
        !selectedAbutmentPosition.value ||
        !selectedAbutmentMaterial.value
      ) {
        return true
      }
      // If 'manual' material is selected, the input field must not be empty
      if (selectedAbutmentMaterial.value === 'manual' && manualMaterialInput.value.trim() === '') {
        return true
      }
      return false
    })

    const handleSelectAbutmentMaterial = (value: string) => {
      selectedAbutmentMaterial.value = value
      // Clear manual input if a predefined option is selected
      if (value !== 'manual') {
        manualMaterialInput.value = ''
      }
    }

    const onNext = () => {
      if (!isNextDisabled.value) {
        emit('next-step', {
          retentionMethod: selectedRetentionMethod.value,
          abutmentPosition: selectedAbutmentPosition.value,
          abutmentMaterial: selectedAbutmentMaterial.value,
          manualMaterialName:
            selectedAbutmentMaterial.value === 'manual' ? manualMaterialInput.value.trim() : null,
        })
      }
    }

    const onPrev = () => {
      emit('prev-step')
    }

    return () => (
      <div class="space-y-8">
        {/* Retention Method Options */}
        <UFormGroup label="Retention Method">
          <URadioGroup
            v-model={selectedRetentionMethod.value}
            items={retentionMethodOptions}
            variant="table"
            orientation="vertical"
          />
        </UFormGroup>

        {/* No Ideal Abutment Position Options */}
        <UFormGroup label="No Ideal Seating Path">
          <URadioGroup
            v-model={selectedAbutmentPosition.value}
            items={abutmentPositionOptions}
            variant="table"
            orientation="vertical"
          />
        </UFormGroup>

        {/* Abutment Material Options */}
        <UFormGroup label="Abutment Material">
          <URadioGroup
            v-model={selectedAbutmentMaterial.value}
            items={abutmentMaterialOptions}
            variant="table"
            orientation="vertical"
            onUpdate:modelValue={handleSelectAbutmentMaterial} // Use onUpdate:modelValue for custom handler
          />
          {selectedAbutmentMaterial.value === 'manual' && (
            <UInput
              v-model={manualMaterialInput.value}
              placeholder="Please enter other material name"
              class="mt-4"
            />
          )}
        </UFormGroup>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="Back" size="lg" variant="outline" onClick={onPrev} />
          <UButton label="Next" size="lg" disabled={isNextDisabled.value} onClick={onNext} />
        </div>
      </div>
    )
  },
})
