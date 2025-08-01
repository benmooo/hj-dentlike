import { defineComponent, ref } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'

export default defineComponent({
  name: 'MaterialComponent',
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

    const materialTypeOptions = [
      {
        label: 'Glass Ceramic',
        value: 'glassCeramic',
        description:
          'Glass ceramic is a type of ceramic material that is made by fusing glass and ceramic materials together.',
      },
      {
        label: 'Zirconia',
        value: 'zirconia',
        description:
          'EmaxMonolithic is the recommended material for inlay/high inlay, please choose with caution.',
      },
      {
        label: 'Metal Ceramic',
        value: 'metalCeramic',
        description:
          'Metal ceramic is a type of ceramic material that is made by fusing metal and ceramic materials together.',
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
            items={materialTypeOptions}
            variant="table"
          ></URadioGroup>
        </UFormGroup>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="Return" size="lg" variant="ghost" onClick={handlePrevStep} />
          <UButton
            label="Next Step"
            size="lg"
            onClick={handleNextStep}
            disabled={!selectedItemType.value} // Disable if no item type is selected
          />
        </div>
      </div>
    )
  },
})
