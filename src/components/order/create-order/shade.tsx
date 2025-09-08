import { defineComponent, ref, reactive, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'
import USeparator from '@nuxt/ui/components/Separator.vue'

// Import 16-shade images
import shadeA1 from '@/assets/image/shade/16/A1.png'
import shadeA2 from '@/assets/image/shade/16/A2.png'
import shadeA3 from '@/assets/image/shade/16/A3.png'
import shadeA35 from '@/assets/image/shade/16/A3.5.png'
import shadeA4 from '@/assets/image/shade/16/A4.png'
import shadeB1 from '@/assets/image/shade/16/B1.png'
import shadeB2 from '@/assets/image/shade/16/B2.png'
import shadeB3 from '@/assets/image/shade/16/B3.png'
import shadeB4 from '@/assets/image/shade/16/B4.png'
import shadeC1 from '@/assets/image/shade/16/C1.png'
import shadeC2 from '@/assets/image/shade/16/C2.png'
import shadeC3 from '@/assets/image/shade/16/C3.png'
import shadeC4 from '@/assets/image/shade/16/C4.png'
import shadeD2 from '@/assets/image/shade/16/D2.png'
import shadeD3 from '@/assets/image/shade/16/D3.png'
import shadeD4 from '@/assets/image/shade/16/D4.png'

// Import 26-shade images
import shade1M1 from '@/assets/image/shade/26/1M1.png'
import shade1M2 from '@/assets/image/shade/26/1M2.png'
import shade2L15 from '@/assets/image/shade/26/2L1.5.png'
import shade2L25 from '@/assets/image/shade/26/2L2.5.png'
import shade2M1 from '@/assets/image/shade/26/2M1.png'
import shade2M2 from '@/assets/image/shade/26/2M2.png'
import shade2M3 from '@/assets/image/shade/26/2M3.png'
import shade2R15 from '@/assets/image/shade/26/2R1.5.png'
import shade2R25 from '@/assets/image/shade/26/2R2.5.png'
import shade3L15 from '@/assets/image/shade/26/3L1.5.png'
import shade3L25 from '@/assets/image/shade/26/3L2.5.png'
import shade3M1 from '@/assets/image/shade/26/3M1.png'
import shade3M2 from '@/assets/image/shade/26/3M2.png'
import shade3M3 from '@/assets/image/shade/26/3M3.png'
import shade3R15 from '@/assets/image/shade/26/3R1.5.png'
import shade3R25 from '@/assets/image/shade/26/3R2.5.png'
import shade4L15 from '@/assets/image/shade/26/4L1.5.png'
import shade4L25 from '@/assets/image/shade/26/4L2.5.png'
import shade4M1 from '@/assets/image/shade/26/4M1.png'
import shade4M2 from '@/assets/image/shade/26/4M2.png'
import shade4M3 from '@/assets/image/shade/26/4M3.png'
import shade4R15 from '@/assets/image/shade/26/4R1.5.png'
import shade4R25 from '@/assets/image/shade/26/4R2.5.png'
import shade5M1 from '@/assets/image/shade/26/5M1.png'
import shade5M2 from '@/assets/image/shade/26/5M2.png'
import shade5M3 from '@/assets/image/shade/26/5M3.png'

export default defineComponent({
  name: 'ShadeSelection',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    // State for selected shade
    const selectedShade = ref<string | null>(null)

    // State for staining options
    const enableStain = ref(false)
    const stainType = reactive({
      cervical: false,
      occlusal: false,
    })

    // Special requirements text area
    const specialRequirements = ref('')

    // Define 16-color shades with their imported images
    const shades16 = [
      { name: 'A1', image: shadeA1 },
      { name: 'A2', image: shadeA2 },
      { name: 'A3', image: shadeA3 },
      { name: 'A3.5', image: shadeA35 },
      { name: 'A4', image: shadeA4 },
      { name: 'B1', image: shadeB1 },
      { name: 'B2', image: shadeB2 },
      { name: 'B3', image: shadeB3 },
      { name: 'B4', image: shadeB4 },
      { name: 'C1', image: shadeC1 },
      { name: 'C2', image: shadeC2 },
      { name: 'C3', image: shadeC3 },
      { name: 'C4', image: shadeC4 },
      { name: 'D2', image: shadeD2 },
      { name: 'D3', image: shadeD3 },
      { name: 'D4', image: shadeD4 },
    ]

    // Define 26-color shades (organized by column for layout)
    const shades26Columns = [
      [{ name: '1M1', image: shade1M1 }, { name: '1M2', image: shade1M2 }],
      [{ name: '2L1.5', image: shade2L15 }, { name: '2L2.5', image: shade2L25 }],
      [{ name: '2M1', image: shade2M1 }, { name: '2M2', image: shade2M2 }, { name: '2M3', image: shade2M3 }],
      [{ name: '2R1.5', image: shade2R15 }, { name: '2R2.5', image: shade2R25 }],
      [{ name: '3L1.5', image: shade3L15 }, { name: '3L2.5', image: shade3L25 }],
      [{ name: '3M1', image: shade3M1 }, { name: '3M2', image: shade3M2 }, { name: '3M3', image: shade3M3 }],
      [{ name: '3R1.5', image: shade3R15 }, { name: '3R2.5', image: shade3R25 }],
      [{ name: '4L1.5', image: shade4L15 }, { name: '4L2.5', image: shade4L25 }],
      [{ name: '4M1', image: shade4M1 }, { name: '4M2', image: shade4M2 }, { name: '4M3', image: shade4M3 }],
      [{ name: '4R1.5', image: shade4R15 }, { name: '4R2.5', image: shade4R25 }],
      [{ name: '5M1', image: shade5M1 }, { name: '5M2', image: shade5M2 }, { name: '5M3', image: shade5M3 }],
    ]

    // Mathematical model:
    // Let S_16 be the set of 16 shades.
    // Let S_26 be the set of 26 shades.
    // Let S be the currently selected shade, S ∈ S_16 ∪ S_26 ∪ {null}.
    //
    // Let F_Stain be a boolean flag for enabling staining.
    // Let T_Cervical be a boolean flag for cervical stain.
    // Let T_Occlusal be a boolean flag for occlusal stain.
    //
    // The selection process:
    // 1. User selects a shade s ∈ S_16 ∪ S_26. Set S = s.
    // 2. User toggles F_Stain. If F_Stain becomes false, then T_Cervical = false and T_Occlusal = false.
    // 3. If F_Stain is true, user can toggle T_Cervical and T_Occlusal independently.
    // 4. User can input text into a special requirements field.

    const selectShade = (shade: string) => {
      selectedShade.value = shade
    }

    const toggleStain = (enabled: boolean) => {
      enableStain.value = enabled
      if (!enabled) {
        stainType.cervical = false
        stainType.occlusal = false
      }
    }

    const onNext = () => {
      emit('next-step', {
        selectedShade: selectedShade.value,
        stainEnabled: enableStain.value,
        stainCervical: stainType.cervical,
        stainOcclusal: stainType.occlusal,
        specialRequirements: specialRequirements.value,
      })
    }

    const onPrev = () => {
      emit('prev-step')
    }

    // Determine if the "Next Step" button should be disabled
    const isNextDisabled = computed(() => !selectedShade.value)

    return () => (
      <div class="space-y-8">
        {/* 16-Color Shades */}
        <div>
          <h2 class="text-lg font-semibold mb-4">16 Shades</h2>
          <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-2 gap-y-4 justify-center">
            {shades16.map((shade) => (
              <button
                key={shade.name}
                type="button"
                class={[
                  'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200',
                  'hover:bg-primary-500/20 border',
                  selectedShade.value === shade.name
                    ? 'bg-primary-500/50 border-primary-500'
                    : 'bg-muted border-muted-600 text-muted',
                ]}
                onClick={() => selectShade(shade.name)}
              >
                {/* Tooth shade image */}
                <img
                  src={shade.image}
                  alt={`Shade ${shade.name}`}
                  class="w-8 h-10 object-contain mb-1"
                />
                <span class="text-sm font-medium">{shade.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 26-Color Shades */}
        <div>
          <h2 class="text-lg font-semibold mb-4">26 Shades</h2>
          <div class="flex justify-center gap-x-2">
            {shades26Columns.map((column, colIndex) => (
              <div key={`col-${colIndex}`} class="flex flex-col gap-y-4 items-center">
                {column.map((shade) => (
                  <button
                    key={shade.name}
                    type="button"
                    class={[
                      'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200',
                      'hover:bg-primary-500/20 border',
                      selectedShade.value === shade.name
                        ? 'bg-primary-500/50 border-primary-500 text-white'
                        : 'bg-muted border-muted-600 text-muted',
                    ]}
                    onClick={() => selectShade(shade.name)}
                  >
                    {/* Tooth shade image */}
                    <img
                      src={shade.image}
                      alt={`Shade ${shade.name}`}
                      class="w-8 h-10 object-contain mb-1"
                    />
                    <span class="text-sm font-medium">{shade.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <USeparator class="mt-8" />

        {/* Staining Options and Special Requirements */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col space-y-4">
            <URadioGroup
              modelValue={enableStain.value ? 'stain' : 'no-stain'}
              onUpdate:modelValue={(val) => toggleStain(val === 'stain')}
              items={[
                { label: '不要染色 (No Stain)', value: 'no-stain' },
                { label: '染色 (Stain)', value: 'stain' },
              ]}
              orientation="vertical"
              class="mb-4"
            />

            {enableStain.value && (
              <div class="flex items-start gap-4">
                {/* Tooth diagram placeholder */}
                <div class="w-24 h-24 bg-muted rounded-lg flex items-center justify-center relative">
                  {/* Visual representation of tooth with stain areas */}
                  <div class="absolute w-16 h-20 rounded-t-full rounded-b-lg bg-neutral-400"></div>
                  {/* Cervical stain area */}
                  {stainType.cervical && (
                    <div class="absolute top-0 w-16 h-8 rounded-t-full bg-amber-300 opacity-70"></div>
                  )}
                  {/* Occlusal stain area (simplified for 2D) */}
                  {stainType.occlusal && (
                    <div class="absolute bottom-0 w-16 h-8 rounded-b-lg bg-amber-300 opacity-70"></div>
                  )}
                </div>
                <div class="flex flex-col space-y-2">
                  <UCheckbox
                    v-model={stainType.cervical}
                    name="cervicalStain"
                    label="颈部染色 (Cervical Stain)"
                  />
                  <UCheckbox
                    v-model={stainType.occlusal}
                    name="occlusalStain"
                    label="咬合部染色 (Occlusal Stain)"
                  />
                </div>
              </div>
            )}
          </div>

          <UFormGroup label="特殊要求填写 (Fill in Special Requirements)" class="flex-grow">
            <UTextarea
              v-model={specialRequirements.value}
              placeholder="Type any special requirements here..."
              class="w-full"
              rows={5}
            />
          </UFormGroup>
        </div>

        {/* Navigation Buttons */}
        {/*<div class="flex justify-center gap-4 mt-8">
          <UButton label="返回 (Return)" size="lg" variant="ghost" onClick={onPrev} />
          <UButton
            label="下一步 (Next Step)"
            size="lg"
            disabled={isNextDisabled.value}
            onClick={onNext}
          />
        </div>*/}
      </div>
    )
  },
})
