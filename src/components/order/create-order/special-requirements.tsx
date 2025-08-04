import { defineComponent, ref, computed } from 'vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'

export default defineComponent({
  name: 'SpecialRequirements',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    const specialRequirements = ref<string>('')
    const urgentOrder = ref<boolean>(false)
    const includeInstructions = ref<boolean>(false)

    const designConfirmation = ref<string>('no-confirmation') // Initialize with a default value

    const designConfirmationOptions = [
      {
        label: 'No confirmation needed',
        value: 'no-confirmation',
      },
      {
        label: 'Confirm design before production',
        value: 'confirm-before-production',
      },
    ]

    // Mathematical Model:
    // Let R be the special requirements text input by the user.
    // Let U be a boolean indicating if the order is urgent.
    // Let I be a boolean indicating if additional instructions are included.
    //
    // The component state is (R, U, I).
    //
    // Constraints for 'Next Step' button:
    // is_next_disabled = false (always enabled, as requirements are optional)
    //
    // On 'Next Step' click:
    // Emits { requirements: R, isUrgent: U, includeInstructions: I }

    const isNextDisabled = computed(() => false) // Always enabled

    const onNext = () => {
      emit('next-step', {
        requirements: specialRequirements.value.trim(),
        isUrgent: urgentOrder.value,
        includeInstructions: includeInstructions.value,
      })
    }

    const onPrev = () => {
      emit('prev-step')
    }

    return () => (
      <div class="space-y-8">
        {/* Special Requirements Text Area */}
        <UFormGroup label="Special Requirements">
          <UTextarea
            v-model={specialRequirements.value}
            placeholder="Enter any special requirements or notes..."
            rows={4}
            class="w-full"
          />
        </UFormGroup>

        {/* Checkbox Options */}
        {/* No Ideal Abutment Position Options */}
        <UFormGroup label="Design Confirmation">
          <URadioGroup
            v-model={designConfirmation.value}
            items={designConfirmationOptions}
            variant="table"
            orientation="vertical"
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
