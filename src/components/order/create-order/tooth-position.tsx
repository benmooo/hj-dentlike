import { defineComponent, ref, reactive, computed, type ComputedRef } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue' // Used for Checkbox-like selection for impression method
import UPopover from '@nuxt/ui/components/Popover.vue' // Not directly used in this design, but kept if needed later
import UFormGroup from '@nuxt/ui/components/FormField.vue' // Useful for grouping form elements

export default defineComponent({
  name: 'ToothPosition',
  setup(_, { emit }) {
    // Reactive state for tooth selection and other options
    const selectedJaw = ref<'upper' | 'lower' | 'full'>('full')
    const selectedCrownType = ref<'single' | 'bridge'>('single')
    const selectedImpressionMethod = ref<'oralScan' | 'plasterModel'>('oralScan')
    const selectedOrderProperty = ref<'urgent' | 'rework'>() // Can be 'urgent', 'rework', or '' for none

    // Using a Set for efficient tooth selection management
    const selectedTeeth = reactive(new Set<string>())

    // Define tooth numbers for upper and lower jaws
    // FDI World Dental Federation notation:
    // Upper right: 18-11, Upper left: 21-28
    // Lower left: 31-38, Lower right: 41-48
    // For simplicity and matching image, let's use a 1-8 system for each quadrant, then map to a unique ID.
    // Given the image numbering, it looks like a simpler 1-8 per half-jaw.
    // Let's create a flat list of 32 teeth with unique IDs for easy management.
    const teethMap = computed(() => {
      const teeth = []
      // Upper Jaw: Right (18-11), Left (21-28)
      for (let i = 8; i >= 1; i--)
        teeth.push({ id: `U${i}R`, number: i, jaw: 'upper', quadrant: 'upper-right' }) // Upper Right 8-1
      for (let i = 1; i <= 8; i++)
        teeth.push({ id: `U${i}L`, number: i, jaw: 'upper', quadrant: 'upper-left' }) // Upper Left 1-8

      // Lower Jaw: Left (31-38), Right (41-48) - The image shows a mirrored lower jaw numbering
      // The image implies a 1-8 for each side, so let's stick to that for now and map internally.
      // For this component, let's use a simplified 1-8 for each quadrant and add a quadrant identifier.
      // A more robust system would map these to FDI or Universal numbering.
      for (let i = 8; i >= 1; i--)
        teeth.push({ id: `L${i}R`, number: i, jaw: 'lower', quadrant: 'lower-right' }) // Lower Right 8-1
      for (let i = 1; i <= 8; i++)
        teeth.push({ id: `L${i}L`, number: i, jaw: 'lower', quadrant: 'lower-left' }) // Lower Left 1-8
      return teeth
    })

    // Group teeth for rendering based on the image layout
    const upperTeethRight = computed(() =>
      teethMap.value.filter((t) => t.quadrant === 'upper-right'),
    )
    const upperTeethLeft = computed(() => teethMap.value.filter((t) => t.quadrant === 'upper-left'))
    const lowerTeethRight = computed(() =>
      teethMap.value.filter((t) => t.quadrant === 'lower-right'),
    )
    const lowerTeethLeft = computed(() => teethMap.value.filter((t) => t.quadrant === 'lower-left'))

    // Mathematical Model for Tooth Selection:
    // Let T be the set of all teeth, T = {t_1, t_2, ..., t_N}, where N=32.
    // Let S_J be the currently selected jaw(s): S_J ∈ {upper, lower, full}.
    // Let S_T be the set of currently selected teeth, S_T ⊆ T.
    //
    // A tooth t_k is selectable if:
    // (S_J = 'full') OR (S_J = 'upper' AND t_k.jaw = 'upper') OR (S_J = 'lower' AND t_k.jaw = 'lower').
    //
    // When a tooth t_k is clicked:
    // If t_k is in S_T (t_k ∈ S_T), then S_T := S_T \ {t_k} (remove).
    // Else if t_k is selectable, then S_T := S_T ∪ {t_k} (add).
    //
    // The "Reset" action sets S_T := ∅.

    const toggleToothSelection = (toothId: string) => {
      if (selectedTeeth.has(toothId)) {
        selectedTeeth.delete(toothId)
      } else {
        // Check if the tooth is part of the currently selected jaw(s)
        const tooth = teethMap.value.find((t) => t.id === toothId)
        if (!tooth) return

        if (
          selectedJaw.value === 'full' ||
          (selectedJaw.value === 'upper' && tooth.jaw === 'upper') ||
          (selectedJaw.value === 'lower' && tooth.jaw === 'lower')
        ) {
          selectedTeeth.add(toothId)
        }
      }
    }

    const resetSelection = () => {
      selectedTeeth.clear()
      selectedJaw.value = 'full'
      selectedCrownType.value = 'single'
      selectedImpressionMethod.value = 'oralScan'
      selectedOrderProperty.value = undefined
    }

    const jawOptions = [
      { label: 'Upper Jaw', value: 'upper' },
      { label: 'Lower Jaw', value: 'lower' },
      { label: 'Full Jaw', value: 'full' },
    ]

    const crownTypeOptions = [
      { label: 'Single Crown', value: 'single' },
      { label: 'Bridge', value: 'bridge' },
    ]

    const impressionMethodOptions = [
      { label: 'Oral Scan', value: 'oralScan' },
      { label: 'Plaster Model', value: 'plasterModel' },
    ]

    const orderPropertyOptions = [
      { label: 'Urgent', value: 'urgent' },
      { label: 'Rework', value: 'rework' },
    ]

    // Determine if a tooth should be clickable based on selected jaw
    const isToothClickable = (jaw: 'upper' | 'lower') => {
      return selectedJaw.value === 'full' || selectedJaw.value === jaw
    }

    return () => (
      <div class="space-y-8 p-4">
        {/* Top Controls */}
        <div class="flex flex-wrap items-center justify-between gap-4">
          <URadioGroup
            v-model={selectedJaw.value}
            legend="Jaw Selection"
            orientation="horizontal"
            items={jawOptions}
            class="flex-grow min-w-[200px]"
          />
          <URadioGroup
            v-model={selectedCrownType.value}
            legend="Crown Type"
            orientation="horizontal"
            items={crownTypeOptions}
            class="flex-grow min-w-[200px]"
          />
          <UButton
            label="Reset"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-path"
            onClick={resetSelection}
          />
        </div>

        {/* Tooth Grid */}
        <div class="flex flex-col items-center justify-center">
          {/* Upper Teeth */}
          <div class="flex border-b border-gray-600 pb-4 mb-4">
            {/* Upper Right Quadrant (8-1) */}
            <div class="flex flex-row-reverse gap-1">
              {' '}
              {/* Reverse order to show 8->1 */}
              {upperTeethRight.value.map((tooth) => (
                <div
                  key={tooth.id}
                  class={[
                    'flex flex-col items-center cursor-pointer p-1 rounded-md transition-colors duration-200',
                    'hover:bg-primary-500/20',
                    selectedTeeth.has(tooth.id) ? 'bg-primary-500/50' : 'bg-gray-700/50',
                    !isToothClickable(tooth.jaw as 'upper' | 'lower') && 'opacity-50 cursor-not-allowed',
                  ]}
                  onClick={() => isToothClickable(tooth.jaw as 'upper' | 'lower') && toggleToothSelection(tooth.id)}
                >
                  {/* Placeholder for tooth image */}
                  <div
                    class={[
                      'i-heroicons-sparkles text-3xl mb-1', // Generic icon, replace with actual tooth images
                      selectedTeeth.has(tooth.id) ? 'text-white' : 'text-gray-400',
                    ]}
                  />
                  <span class="text-sm font-bold">{tooth.number}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div class="w-px bg-gray-600 mx-4 h-full" />
            {/* Upper Left Quadrant (1-8) */}
            <div class="flex gap-1">
              {upperTeethLeft.value.map((tooth) => (
                <div
                  key={tooth.id}
                  class={[
                    'flex flex-col items-center cursor-pointer p-1 rounded-md transition-colors duration-200',
                    'hover:bg-primary-500/20',
                    selectedTeeth.has(tooth.id) ? 'bg-primary-500/50' : 'bg-gray-700/50',
                    !isToothClickable(tooth.jaw as 'upper' | 'lower') && 'opacity-50 cursor-not-allowed',
                  ]}
                  onClick={() => isToothClickable(tooth.jaw as 'upper' | 'lower') && toggleToothSelection(tooth.id)}
                >
                  {/* Placeholder for tooth image */}
                  <div
                    class={[
                      'i-heroicons-sparkles text-3xl mb-1', // Generic icon, replace with actual tooth images
                      selectedTeeth.has(tooth.id) ? 'text-white' : 'text-gray-400',
                    ]}
                  />
                  <span class="text-sm font-bold">{tooth.number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Teeth */}
          <div class="flex">
            {/* Lower Right Quadrant (8-1) */}
            <div class="flex flex-row-reverse gap-1">
              {lowerTeethRight.value.map((tooth) => (
                <div
                  key={tooth.id}
                  class={[
                    'flex flex-col items-center cursor-pointer p-1 rounded-md transition-colors duration-200',
                    'hover:bg-primary-500/20',
                    selectedTeeth.has(tooth.id) ? 'bg-primary-500/50' : 'bg-gray-700/50',
                    !isToothClickable(tooth.jaw as 'upper' | 'lower') && 'opacity-50 cursor-not-allowed',
                  ]}
                  onClick={() => isToothClickable(tooth.jaw as 'upper' | 'lower') && toggleToothSelection(tooth.id)}
                >
                  {/* Placeholder for tooth image */}
                  <div
                    class={[
                      'i-heroicons-sparkles text-3xl mb-1', // Generic icon, replace with actual tooth images
                      selectedTeeth.has(tooth.id) ? 'text-white' : 'text-gray-400',
                    ]}
                  />
                  <span class="text-sm font-bold">{tooth.number}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div class="w-px bg-gray-600 mx-4 h-full" />
            {/* Lower Left Quadrant (1-8) */}
            <div class="flex gap-1">
              {lowerTeethLeft.value.map((tooth) => (
                <div
                  key={tooth.id}
                  class={[
                    'flex flex-col items-center cursor-pointer p-1 rounded-md transition-colors duration-200',
                    'hover:bg-primary-500/20',
                    selectedTeeth.has(tooth.id) ? 'bg-primary-500/50' : 'bg-gray-700/50',
                    !isToothClickable(tooth.jaw as 'upper' | 'lower') && 'opacity-50 cursor-not-allowed',
                  ]}
                  onClick={() => isToothClickable(tooth.jaw as 'upper' | 'lower') && toggleToothSelection(tooth.id)}
                >
                  {/* Placeholder for tooth image */}
                  <div
                    class={[
                      'i-heroicons-sparkles text-3xl mb-1', // Generic icon, replace with actual tooth images
                      selectedTeeth.has(tooth.id) ? 'text-white' : 'text-gray-400',
                    ]}
                  />
                  <span class="text-sm font-bold">{tooth.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Options */}
        <div class="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-gray-600">
          <UFormGroup label="Impression Method" class="min-w-[200px]">
            <URadioGroup
              v-model={selectedImpressionMethod.value}
              orientation="horizontal"
              items={impressionMethodOptions}
            />
          </UFormGroup>
          <UFormGroup label="Order Property" class="min-w-[200px]">
            <URadioGroup
              v-model={selectedOrderProperty.value}
              orientation="horizontal"
              items={orderPropertyOptions}
            />
          </UFormGroup>
        </div>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton
            label="Return"
            size="lg"
            variant="ghost"
            onClick={() => emit('prev-step')}
          />
          <UButton
            label="Next Step"
            size="lg"
            onClick={() => {
              // Emit selected teeth and other options to parent
              emit('next-step', {
                teeth: Array.from(selectedTeeth),
                jaw: selectedJaw.value,
                crownType: selectedCrownType.value,
                impressionMethod: selectedImpressionMethod.value,
                orderProperty: selectedOrderProperty.value,
              })
            }}
          />
        </div>
      </div>
    )
  },
})
