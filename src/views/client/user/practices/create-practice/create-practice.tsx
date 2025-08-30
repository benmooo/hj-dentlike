import { defineComponent, reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import USwitch from '@nuxt/ui/components/Switch.vue'

import { useRouter } from 'vue-router'

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, '门诊名称不能为空')),
  country: v.pipe(v.string(), v.minLength(1, '请选择国家/地区')),
  address: v.pipe(v.string(), v.minLength(1, '详细地址不能为空')),
  postalCode: v.pipe(
    v.string(),
    v.minLength(1, '邮政编码不能为空'),
    v.regex(/^\d{4,10}$/, '请输入有效的邮政编码'),
  ),
  status: v.boolean(),
})

type Schema = v.InferOutput<typeof schema>

export default defineComponent({
  name: 'CreatePracticeComponent',
  setup() {
    const state = reactive({
      name: '',
      country: '',
      address: '',
      postalCode: '',
      status: true,
    })

    const countryOptions = [
      { label: '中国', value: 'china' },
      { label: '美国', value: 'usa' },
      { label: '英国', value: 'uk' },
      { label: '日本', value: 'japan' },
    ]

    const statusOptions = [
      { label: '启用', value: 'enabled' },
      { label: '停用', value: 'disabled' },
    ]

    const toast = useToast()
    const router = useRouter()

    const handleCancel = () => {
      router.go(-1)
    }

    const onSubmit = async (event: FormSubmitEvent<Schema>) => {
      toast.add({ title: '成功', description: '门诊已保存', color: 'success' })
      console.log('Saving practice:', event.data)
      router.go(-1)
    }

    return () => (
      <div class="max-w-2xl">
        <div class="space-y-6">
          {/* Header */}
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-foreground">新增门诊</h1>
          </div>

          <UForm schema={schema} state={state} onSubmit={onSubmit}>
            <div class="space-y-4">
              {/* Practice Name */}
              <UFormField label="门诊名称" name="name">
                <UInput v-model={state.name} placeholder="门诊名称" size="lg" class="w-full" />
              </UFormField>

              {/* Country/Region */}
              <UFormField label="国家/地区" name="country">
                <USelect
                  v-model={state.country}
                  items={countryOptions}
                  placeholder="选择国家地区"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              {/* Address */}
              <UFormField label="详细地址" name="address">
                <UTextarea
                  v-model={state.address}
                  placeholder="请填写详细地址"
                  rows={3}
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              {/* Postal Code */}
              <UFormField label="邮政编码" name="postalCode">
                <UInput
                  v-model={state.postalCode}
                  placeholder="邮政编码"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              {/* Status */}
              <UFormField label="状态" name="status">
                {/*<URadioGroup
                  v-model={state.status}
                  items={statusOptions}
                  orientation="horizontal"
                />*/}
                <USwitch
                  // color="success"
                  v-model={state.status}
                  unchecked-icon="i-lucide-x"
                  checked-icon="i-lucide-check"
                  label="启用"
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
