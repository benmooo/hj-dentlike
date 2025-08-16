import { defineComponent, ref, reactive, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'

// Import tooth images
import tooth11 from '@/assets/image/tooth/11.png'
import tooth12 from '@/assets/image/tooth/12.png'
import tooth13 from '@/assets/image/tooth/13.png'
import tooth14 from '@/assets/image/tooth/14.png'
import tooth15 from '@/assets/image/tooth/15.png'
import tooth16 from '@/assets/image/tooth/16.png'
import tooth17 from '@/assets/image/tooth/17.png'
import tooth18 from '@/assets/image/tooth/18.png'
import tooth31 from '@/assets/image/tooth/31.png'
import tooth32 from '@/assets/image/tooth/32.png'
import tooth33 from '@/assets/image/tooth/33.png'
import tooth34 from '@/assets/image/tooth/34.png'
import tooth35 from '@/assets/image/tooth/35.png'
import tooth36 from '@/assets/image/tooth/36.png'
import tooth37 from '@/assets/image/tooth/37.png'
import tooth38 from '@/assets/image/tooth/38.png'

// Import missing tooth images
import tooth11Miss from '@/assets/image/tooth/11_miss.png'
import tooth12Miss from '@/assets/image/tooth/12_miss.png'
import tooth13Miss from '@/assets/image/tooth/13_miss.png'
import tooth14Miss from '@/assets/image/tooth/14_miss.png'
import tooth15Miss from '@/assets/image/tooth/15_miss.png'
import tooth16Miss from '@/assets/image/tooth/16_miss.png'
import tooth17Miss from '@/assets/image/tooth/17_miss.png'
import tooth18Miss from '@/assets/image/tooth/18_miss.png'
import tooth31Miss from '@/assets/image/tooth/31_miss.png'
import tooth32Miss from '@/assets/image/tooth/32_miss.png'
import tooth33Miss from '@/assets/image/tooth/33_miss.png'
import tooth34Miss from '@/assets/image/tooth/34_miss.png'
import tooth35Miss from '@/assets/image/tooth/35_miss.png'
import tooth36Miss from '@/assets/image/tooth/36_miss.png'
import tooth37Miss from '@/assets/image/tooth/37_miss.png'
import tooth38Miss from '@/assets/image/tooth/38_miss.png'

const toothImages = {
  11: tooth11,
  12: tooth12,
  13: tooth13,
  14: tooth14,
  15: tooth15,
  16: tooth16,
  17: tooth17,
  18: tooth18,
  31: tooth31,
  32: tooth32,
  33: tooth33,
  34: tooth34,
  35: tooth35,
  36: tooth36,
  37: tooth37,
  38: tooth38,
}

const toothMissingImages = {
  11: tooth11Miss,
  12: tooth12Miss,
  13: tooth13Miss,
  14: tooth14Miss,
  15: tooth15Miss,
  16: tooth16Miss,
  17: tooth17Miss,
  18: tooth18Miss,
  31: tooth31Miss,
  32: tooth32Miss,
  33: tooth33Miss,
  34: tooth34Miss,
  35: tooth35Miss,
  36: tooth36Miss,
  37: tooth37Miss,
  38: tooth38Miss,
}

export default defineComponent({
  name: 'ToothPosition',
  setup(_, { emit }) {
    // Reactive state for tooth selection and other options
    const selectedJaw = ref<'upper' | 'lower' | 'full'>('full')
    const selectedCrownType = ref<'single' | 'bridge'>('single')
    const selectedImpressionMethod = ref<'oralScan' | 'plasterModel'>('oralScan')
    const selectedOrderProperty = ref<'urgent' | 'rework'>()

    // Using a Set for efficient tooth selection management
    const selectedTeeth = reactive(new Set<string>())

    // Define tooth numbers using FDI World Dental Federation notation:
    // Upper right: 18-11, Upper left: 21-28
    // Lower left: 31-38, Lower right: 41-48
    const teethMap = computed(() => {
      const teeth = []

      // Upper Right Quadrant (18-11) - Available images: 18-11
      for (let i = 18; i >= 11; i--) {
        teeth.push({
          id: `${i}`,
          fdiNumber: i,
          displayNumber: 18 - i + 1, // Convert to 1-8 for display
          jaw: 'upper',
          quadrant: 'upper-right',
          imagePath: toothImages[i as keyof typeof toothImages],
          missingImagePath: toothMissingImages[i as keyof typeof toothMissingImages],
          needsFlip: false,
        })
      }

      // Upper Left Quadrant (21-28) - Use flipped 11-18 images
      for (let i = 21; i <= 28; i++) {
        const sourceNumber = (32 - i) as keyof typeof toothImages // Maps 21->11, 22->12, ..., 28->18
        teeth.push({
          id: `${i}`,
          fdiNumber: i,
          displayNumber: i - 20, // Convert to 1-8 for display
          jaw: 'upper',
          quadrant: 'upper-left',
          imagePath: toothImages[sourceNumber],
          missingImagePath: toothMissingImages[sourceNumber],
          needsFlip: true,
        })
      }

      // Lower Left Quadrant (31-38) - Available images: 31-38
      for (let i = 31; i <= 38; i++) {
        teeth.push({
          id: `${i}`,
          fdiNumber: i,
          displayNumber: i - 30, // Convert to 1-8 for display
          jaw: 'lower',
          quadrant: 'lower-left',
          imagePath: toothImages[i as keyof typeof toothImages],
          missingImagePath: toothMissingImages[i as keyof typeof toothMissingImages],
          needsFlip: false,
        })
      }

      // Lower Right Quadrant (41-48) - Use flipped 31-38 images
      for (let i = 48; i >= 41; i--) {
        const sourceNumber = (79 - i) as keyof typeof toothImages // Maps 48->31, 47->32, ..., 41->38
        teeth.push({
          id: `${i}`,
          fdiNumber: i,
          displayNumber: 49 - i, // Convert to 1-8 for display
          jaw: 'lower',
          quadrant: 'lower-right',
          imagePath: toothImages[sourceNumber],
          missingImagePath: toothMissingImages[sourceNumber],
          needsFlip: true,
        })
      }

      return teeth
    })

    // Group teeth for rendering based on quadrants
    const upperTeethRight = computed(() =>
      teethMap.value.filter((t) => t.quadrant === 'upper-right'),
    )
    const upperTeethLeft = computed(() => teethMap.value.filter((t) => t.quadrant === 'upper-left'))
    const lowerTeethLeft = computed(() => teethMap.value.filter((t) => t.quadrant === 'lower-left'))
    const lowerTeethRight = computed(() =>
      teethMap.value.filter((t) => t.quadrant === 'lower-right'),
    )

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

    const toggleToothSelection = (toothId: string) => {
      if (selectedTeeth.has(toothId)) {
        selectedTeeth.delete(toothId)
      } else {
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

    // Component to render individual tooth
    const ToothComponent = ({ tooth }: { tooth: any }) => {
      const isSelected = selectedTeeth.has(tooth.id)
      const isClickable = isToothClickable(tooth.jaw)

      return (
        <div
          class={[
            'flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all duration-200',
            'hover:bg-primary/10 hover:scale-105',
            isSelected ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted/10',
            !isClickable && 'opacity-30 cursor-not-allowed hover:scale-100 hover:bg-transparent',
          ]}
          onClick={() => isClickable && toggleToothSelection(tooth.id)}
        >
          {/* Tooth Image */}
          <div
            class={[
              'relative w-4 h-16 mb-1 transition-transform duration-200',
              tooth.needsFlip && 'transform scale-x-[-1]',
              isSelected && 'brightness-110',
            ]}
          >
            <img
              src={tooth.imagePath}
              alt={`Tooth ${tooth.fdiNumber}`}
              class="w-full h-full object-contain"
              style="image-rendering: crisp-edges;"
            />
            {/* Selection indicator */}
            {isSelected && (
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                <div class="i-heroicons-check text-white text-xs" />
              </div>
            )}
          </div>

          {/* Tooth Number */}
          <span
            class={[
              'text-xs font-bold transition-colors duration-200',
              isSelected ? 'text-primary' : 'text-muted',
              !isClickable && 'text-dimmed',
            ]}
          >
            {tooth.displayNumber}
          </span>
        </div>
      )
    }

    return () => (
      <div class="space-y-8 p-6 bg-background text-foreground min-h-screen">
        {/* Top Controls */}
        <div class="flex flex-wrap items-center justify-between gap-4 bg-surface p-4 rounded-xl">
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
            color="secondary"
            variant="ghost"
            icon="i-heroicons-arrow-path"
            onClick={resetSelection}
            class="hover:bg-primary/20"
          />
        </div>

        {/* Tooth Grid */}
        <div class="flex flex-col items-center justify-center space-y-8 bg-surface/30 p-8 rounded-2xl">
          {/* Upper Teeth */}
          <div class="flex items-center gap-2">
            {/* Upper Right Quadrant (18-11 → 8-1) */}
            <div class="flex gap-2">
              {upperTeethRight.value.map((tooth) => (
                <ToothComponent key={tooth.id} tooth={tooth} />
              ))}
            </div>

            {/* Central Divider */}
            <div class="w-px bg-gradient-to-b from-transparent via-muted to-transparent h-20 mx-2" />

            {/* Upper Left Quadrant (21-28 → 1-8) */}
            <div class="flex gap-2">
              {upperTeethLeft.value.map((tooth) => (
                <ToothComponent key={tooth.id} tooth={tooth} />
              ))}
            </div>
          </div>

          {/* Horizontal Jaw Separator */}
          <div class="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

          {/* Lower Teeth */}
          <div class="flex items-center gap-2">
            {/* Lower Right Quadrant (48-41 → 8-1) */}
            <div class="flex gap-2">
              {lowerTeethRight.value.map((tooth) => (
                <ToothComponent key={tooth.id} tooth={tooth} />
              ))}
            </div>

            {/* Central Divider */}
            <div class="w-px bg-gradient-to-b from-transparent via-muted to-transparent h-20 mx-2" />

            {/* Lower Left Quadrant (31-38 → 1-8) */}
            <div class="flex gap-2">
              {lowerTeethLeft.value.map((tooth) => (
                <ToothComponent key={tooth.id} tooth={tooth} />
              ))}
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedTeeth.size > 0 && (
          <div class="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-primary mb-2">
              Selected Teeth ({selectedTeeth.size})
            </h3>
            <div class="flex flex-wrap gap-2">
              {Array.from(selectedTeeth)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map((toothId) => {
                  const tooth = teethMap.value.find((t) => t.id === toothId)
                  return (
                    <span
                      key={toothId}
                      class="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium"
                    >
                      {tooth?.fdiNumber}
                    </span>
                  )
                })}
            </div>
          </div>
        )}

        {/* Bottom Options */}
        <div class="flex flex-wrap items-center justify-between gap-6 bg-surface p-4 rounded-xl">
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
            class="hover:bg-secondary"
          />
          <UButton
            label="Next Step"
            size="lg"
            color="primary"
            disabled={selectedTeeth.size === 0}
            onClick={() => {
              emit('next-step', {
                teeth: Array.from(selectedTeeth),
                jaw: selectedJaw.value,
                crownType: selectedCrownType.value,
                impressionMethod: selectedImpressionMethod.value,
                orderProperty: selectedOrderProperty.value,
              })
            }}
            class="disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    )
  },
})
