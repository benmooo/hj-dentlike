import { defineComponent, ref, reactive, computed } from 'vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'
import USeparator from '@nuxt/ui/components/Separator.vue'

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

    // Define 16-color shades
    const shades16 = [
      'A1',
      'A2',
      'A3',
      'A3.5',
      'A4',
      'B1',
      'B2',
      'B3',
      'B4',
      'C1',
      'C2',
      'C3',
      'C4',
      'D2',
      'D3',
      'D4',
    ]

    // Define 26-color shades (organized by column for layout)
    const shades26Columns = [
      ['1M1', '1M2'],
      ['2L1.5', '2L2.5'],
      ['2M1', '2M2', '2M3'],
      ['2R1.5', '2R2.5'],
      ['3L1.5', '3L2.5'],
      ['3M1', '3M2', '3M3'],
      ['3R1.5', '3R2.5'],
      ['4L1.5', '4L2.5'],
      ['4M1', '4M2', '4M3'],
      ['4R1.5', '4R2.5'],
      ['5M1', '5M2', '5M3'],
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
                key={shade}
                type="button"
                class={[
                  'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200',
                  'hover:bg-primary-500/20 border',
                  selectedShade.value === shade
                    ? 'bg-primary-500/50 border-primary-500'
                    : 'bg-muted border-muted-600 text-muted',
                ]}
                onClick={() => selectShade(shade)}
              >
                {/* Placeholder for tooth image */}
                <div class="i-heroicons-sparkles text-3xl mb-1" />
                <span class="text-sm font-medium">{shade}</span>
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
                    key={shade}
                    type="button"
                    class={[
                      'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200',
                      'hover:bg-primary-500/20 border',
                      selectedShade.value === shade
                        ? 'bg-primary-500/50 border-primary-500 text-white'
                        : 'bg-muted border-muted-600 text-muted',
                    ]}
                    onClick={() => selectShade(shade)}
                  >
                    {/* Placeholder for tooth image */}
                    <div class="i-heroicons-sparkles text-3xl mb-1" />
                    <span class="text-sm font-medium">{shade}</span>
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
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="返回 (Return)" size="lg" variant="ghost" onClick={onPrev} />
          <UButton
            label="下一步 (Next Step)"
            size="lg"
            disabled={isNextDisabled.value}
            onClick={onNext}
          />
        </div>
      </div>
    )
  },
})
