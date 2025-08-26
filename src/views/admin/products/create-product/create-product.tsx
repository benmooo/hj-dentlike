import { defineComponent, reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import { useRouter } from 'vue-router'

const schema = v.object({
  type: v.pipe(v.string(), v.minLength(1, '类型不能为空')),
  typeEn: v.pipe(v.string(), v.minLength(1, '类型英文不能为空')),
  material: v.pipe(v.string(), v.minLength(1, '材料不能为空')),
  materialEn: v.pipe(v.string(), v.minLength(1, '材料英文不能为空')),
  unitPrice: v.pipe(v.number(), v.minValue(0, '单价不能为负数')),
  unit: v.pipe(v.string(), v.minLength(1, '单位不能为空')),
  calculationUnit: v.pipe(v.string(), v.minLength(1, '请选择计算单位')),
  status: v.pipe(v.string(), v.minLength(1, '请选择状态')),
})

type Schema = v.InferOutput<typeof schema>

export default defineComponent({
  name: 'CreateProductComponent',
  setup() {
    const state = reactive({
      type: '',
      typeEn: '',
      material: '',
      materialEn: '',
      unitPrice: 0,
      unit: '',
      calculationUnit: '按牙位',
      status: '在用',
    })

    const calculationUnitOptions = [
      { label: '按牙位', value: '按牙位' },
      { label: '按上下颌', value: '按上下颌' },
    ]

    const statusOptions = [
      { label: '在用', value: '在用' },
      { label: '停用', value: '停用' },
    ]

    const toast = useToast()
    const router = useRouter()

    const handleCancel = () => {
      router.go(-1)
    }

    const onSubmit = async (event: FormSubmitEvent<Schema>) => {
      toast.add({ title: '成功', description: '产品已保存', color: 'success' })
      console.log('Saving product:', event.data)
      router.go(-1)
    }

    return () => (
      <div class="max-w-2xl">
        <div class="space-y-6">
          {/* Header */}
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-foreground">新增产品</h1>
          </div>

          <UForm schema={schema} state={state} onSubmit={onSubmit}>
            <div class="space-y-4">
              {/* Type */}
              <UFormField label="类型" name="type">
                <UInput v-model={state.type} placeholder="类型" size="lg" class="w-full" />
              </UFormField>

              {/* Type English */}
              <UFormField label="类型英文" name="typeEn">
                <UInput v-model={state.typeEn} placeholder="类型英文" size="lg" class="w-full" />
              </UFormField>

              {/* Material */}
              <UFormField label="材料" name="material">
                <UInput v-model={state.material} placeholder="材料" size="lg" class="w-full" />
              </UFormField>

              {/* Material English */}
              <UFormField label="材料英文" name="materialEn">
                <UInput
                  v-model={state.materialEn}
                  placeholder="材料英文"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              {/* Unit Price */}
              <UFormField label="单价" name="unitPrice">
                <div class="relative">
                  <UInput
                    v-model={state.unitPrice}
                    placeholder="单价"
                    type="number"
                    size="lg"
                    class="w-full"
                    trailing
                  >
                    {{
                      trailing: () => (
                        <UButton
                          color="neutral"
                          variant="link"
                          size="sm"
                          icon="i-lucide-circle-dollar-sign"
                          aria-label="Clear input"
                        />
                      ),
                    }}
                  </UInput>
                </div>
              </UFormField>

              {/* Unit */}
              <UFormField label="单位" name="unit">
                <UInput v-model={state.unit} placeholder="单位" size="lg" class="w-full" />
              </UFormField>

              {/* Calculation Unit */}
              <UFormField label="计算单位" name="calculationUnit">
                <URadioGroup
                  v-model={state.calculationUnit}
                  items={calculationUnitOptions}
                  orientation="horizontal"
                />
              </UFormField>

              {/* Status */}
              <UFormField label="状态" name="status">
                <URadioGroup
                  v-model={state.status}
                  items={statusOptions}
                  orientation="horizontal"
                />
              </UFormField>
            </div>

            {/* Action Buttons */}
            <div class="flex gap-4 mt-8">
              <UButton variant="outline" size="lg" class="flex-1" onClick={handleCancel}>
                <span class="mx-auto">取消</span>
              </UButton>
              <UButton type="submit" color="primary" size="lg" class="flex-1">
                <span class="mx-auto">完成</span>
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    )
  },
})
