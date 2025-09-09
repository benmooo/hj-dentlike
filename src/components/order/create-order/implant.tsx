import { defineComponent, ref, computed } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UFormGroup from '@nuxt/ui/components/FormField.vue'
import URadio from '@nuxt/ui/components/RadioGroup.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UIcon from '@nuxt/ui/components/Icon.vue'

interface ImplantVariant {
  code: string
  label: string
}

interface ImplantType {
  code: string
  label: string
  variants?: ImplantVariant[]
  hasCustomInput?: boolean
}

interface ImplantSystem {
  code: string
  label: string
  types?: ImplantType[]
  hasCustomInput?: boolean
}

interface Selection {
  system: string
  types: Record<string, boolean>
  variants: Record<string, string>
  customInputs: Record<string, string>
  otherInput: string
}

export default defineComponent({
  name: 'ImplantSelection',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    const selection = ref<Selection>({
      system: '',
      types: {},
      variants: {},
      customInputs: {},
      otherInput: ''
    })

    // Mathematical model: Hierarchical implant system data structure
    // S = {straumann, osstem, megagen, bioconcept, sic, other}
    // ∀ system si ∈ S, ∃ types Ti = {t1, t2, ...} ∧ variants Vij = {v1, v2, ...}
    const implantSystems: ImplantSystem[] = [
      {
        code: 'straumann',
        label: '士卓曼 Straumann',
        types: [
          {
            code: 'bl',
            label: 'BL',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'blx',
            label: 'BLX',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'blt',
            label: 'BLT',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'tl',
            label: 'TL',
            variants: [
              { code: 'nn', label: 'NN' },
              { code: 'rn', label: 'RN' },
              { code: 'wn', label: 'WN' }
            ],
            hasCustomInput: true
          }
        ]
      },
      {
        code: 'osstem',
        label: '奥齿康 Osstem TS3',
        types: [
          { code: 'mini', label: 'Mini', hasCustomInput: true },
          { code: 'regular', label: 'Regular', hasCustomInput: true }
        ]
      },
      {
        code: 'megagen',
        label: '美格真 Megagen',
        types: [
          { code: 'anyridge', label: 'AnyRidge', hasCustomInput: true }
        ]
      },
      {
        code: 'bioconcept',
        label: '百康特 Bioconcept',
        types: [
          {
            code: 'bv',
            label: 'BV',
            variants: [
              { code: 'mini', label: 'Mini' },
              { code: 'regular', label: 'Regular' }
            ],
            hasCustomInput: true
          },
          {
            code: 'bl',
            label: 'BL',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'blt',
            label: 'BLT',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'blx',
            label: 'BLX',
            variants: [
              { code: 'nc', label: 'NC' },
              { code: 'rc', label: 'RC' }
            ],
            hasCustomInput: true
          },
          {
            code: 'tl',
            label: 'TL',
            variants: [
              { code: 'nn', label: 'NN' },
              { code: 'rn', label: 'RN' },
              { code: 'pn', label: 'PN' },
              { code: 'wn', label: 'WN' }
            ],
            hasCustomInput: true
          }
        ]
      },
      {
        code: 'sic',
        label: 'SIC',
        types: [
          { code: 'purple', label: 'Purple', hasCustomInput: true },
          { code: 'blue', label: 'Blue', hasCustomInput: true }
        ]
      },
      {
        code: 'other',
        label: '其他'
      }
    ]

    // Validation function: V(selection) → Boolean
    // ∃ system selected ∧ (system = "other" → otherInput ≠ ∅ ∨ ∃ type selected)
    const isSelectionValid = computed(() => {
      if (!selection.value.system) return false

      if (selection.value.system === 'other') {
        return selection.value.otherInput.trim().length > 0
      }

      // Check if at least one type is selected for systems with types
      return Object.keys(selection.value.types).some(key => selection.value.types[key])
    })

    const handleSystemSelect = (systemCode: string) => {
      selection.value = {
        system: systemCode,
        types: {},
        variants: {},
        customInputs: {},
        otherInput: systemCode === 'other' ? selection.value.otherInput : ''
      }
    }

    const handleTypeToggle = (typeCode: string) => {
      selection.value.types[typeCode] = !selection.value.types[typeCode]

      // Clear variants and custom inputs for this type if unchecked
      if (!selection.value.types[typeCode]) {
        delete selection.value.variants[typeCode]
        delete selection.value.customInputs[typeCode]
      }
    }

    const handleVariantSelect = (typeCode: string, variantCode: string) => {
      selection.value.variants[typeCode] = variantCode
    }

    const onNext = () => {
      if (isSelectionValid.value) {
        emit('next-step', { ...selection.value })
      }
    }

    const onPrev = () => {
      emit('prev-step')
    }

    return () => (
      <div class="min-h-screen bg-background text-foreground p-6">
        {/* Breadcrumb Header */}
        <div class="mb-8">
          <UBadge variant="subtle" class="text-sm">
            种植相关的问题 <UIcon name="i-heroicons-chevron-right" class="mx-2" /> 种植体系统
          </UBadge>
        </div>

        <UCard class="bg-card border border-border">
          <div class="space-y-8 p-6">
            {/* Implant Systems */}
            <div class="space-y-6">
              {implantSystems.map((system) => (
                <div key={system.code} class="space-y-4">
                  {/* System Selection */}
                  <div class="flex items-center gap-3">
                    <URadio
                      v-model={selection.value.system}
                      // value={system.code}
                      class={selection.value.system === system.code ? 'text-primary' : 'text-muted-foreground'}
                    />
                    {selection.value.system === system.code && (
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-primary" />
                    )}
                    <span class="text-lg font-medium">{system.label}</span>
                  </div>

                  {/* System Types */}
                  {selection.value.system === system.code && system.types && (
                    <div class="ml-8 grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8">
                      {system.types.map((type) => (
                        <div key={type.code} class="flex items-center gap-3 flex-wrap">
                          <URadio
                            // checked={selection.value.types[type.code]}
                            // onUpdate:checked={() => handleTypeToggle(type.code)}
                            class="text-muted-foreground"
                          />
                          <span class="font-medium">{type.label}</span>

                          {/* Variants */}
                          {type.variants && selection.value.types[type.code] && (
                            <div class="flex items-center gap-2 ml-2">
                              <span class="text-muted-foreground">(</span>
                              {type.variants.map((variant, index) => (
                                <div key={variant.code} class="flex items-center gap-1">
                                  {index > 0 && <span class="text-muted-foreground">|</span>}
                                  <URadio
                                    v-model={selection.value.variants[type.code]}
                                    // value={variant.code}
                                    class="text-muted-foreground"
                                    size="sm"
                                  />
                                  <span class="text-sm">{variant.label}</span>
                                </div>
                              ))}
                              <span class="text-muted-foreground">)</span>
                            </div>
                          )}

                          {/* Custom Input */}
                          {type.hasCustomInput && selection.value.types[type.code] && (
                            <UInput
                              v-model={selection.value.customInputs[type.code]}
                              placeholder="规格"
                              size="sm"
                              variant="outline"
                              class="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Other Input */}
                  {selection.value.system === 'other' && system.code === 'other' && (
                    <UFormGroup class="ml-8">
                      <UTextarea
                        v-model={selection.value.otherInput}
                        placeholder="请输入其他种植体系统信息..."
                        rows={6}
                        variant="outline"
                        class="max-w-md"
                      />
                    </UFormGroup>
                  )}
                </div>
              ))}
            </div>
          </div>
        </UCard>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton
            variant="outline"
            size="lg"
            onClick={onPrev}
            class="px-8"
          >
            返回
          </UButton>
          <UButton
            variant="solid"
            color="primary"
            size="lg"
            disabled={!isSelectionValid.value}
            onClick={onNext}
            class="px-8"
          >
            下一步
          </UButton>
        </div>
      </div>
    )
  }
})
