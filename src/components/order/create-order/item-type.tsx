import { defineComponent, ref } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'

export default defineComponent({
  name: 'ItemType',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'prev-step', 'next-step'],
  setup(props, { emit }) {
    const selectedItemType = ref(props.modelValue)

    // Mathematical Model for Item Type Selection:
    // Let I be the set of available item types, I = {i_1, i_2, ..., i_M}.
    // Let S_I be the currently selected item type, S_I ∈ I ∪ {null}.
    //
    // When an item type i_k is selected (e.g., via radio button):
    // S_I := i_k.
    //
    // The component emits the selected value when it changes, and triggers
    // navigation events for "Next Step" and "Return".

    const itemTypeOptions = [
      {
        label: 'Crown',
        value: 'crown',
        description:
          'A crown is a type of dental restoration that covers the entire surface of a tooth.',
      },
      {
        label: 'Inlay/Onlay',
        value: 'inlayOnlay',
        description:
          'An inlay or onlay is a type of dental restoration that is bonded to the surface of a tooth.',
      },
      {
        label: 'Veneer',
        value: 'veneer',
        description:
          'A veneer is a type of dental restoration that covers the front surface of a tooth.',
      },
      {
        label: 'Bridge',
        value: 'bridge',
        description:
          'A bridge is a type of dental restoration that replaces one or more missing teeth.',
      },
      {
        label: 'Single Implant',
        value: 'singleImplant',
        description:
          'A single implant is a type of dental restoration that replaces a single missing tooth.',
      },
      {
        label: 'Implant Bridge/Crown',
        value: 'implantBridgeCrown',
        description:
          'An implant bridge/crown is a type of dental restoration that replaces one or more missing teeth using implants.',
      },
      {
        label: 'Surgical Guide',
        value: 'surgicalGuide',
        description:
          'A surgical guide is a type of dental restoration that is used to guide the placement of dental implants.',
      },
      {
        label: 'Full Arch/Half Arch',
        value: 'fullHalfArch',
        description:
          'A full arch or half arch is a type of dental restoration that replaces all or some of the teeth in the upper or lower jaw.',
      },
    ]

    const handleNextStep = () => {
      emit('next-step', selectedItemType.value)
    }

    const handlePrevStep = () => {
      emit('prev-step')
    }

    return () => (
      <div class="space-y-8">
        <UFormGroup label="Select Item Type">
          <URadioGroup
            v-model={selectedItemType.value}
            items={itemTypeOptions}
            variant="table"
          ></URadioGroup>
        </UFormGroup>

        {/* Navigation Buttons */}
        {/*<div class="flex justify-center gap-4 mt-8">
          <UButton label="Return" size="lg" variant="ghost" onClick={handlePrevStep} />
          <UButton
            label="Next Step"
            size="lg"
            onClick={handleNextStep}
            disabled={!selectedItemType.value} // Disable if no item type is selected
          />
        </div>*/}
      </div>
    )
  },
})
