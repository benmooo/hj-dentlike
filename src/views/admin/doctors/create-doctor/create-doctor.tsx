import { defineComponent, reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
import { useRouter } from 'vue-router'

const schema = v.object({
  doctorName: v.pipe(v.string(), v.minLength(1, '医生姓名不能为空')),
  phoneNumber: v.pipe(v.string(), v.minLength(1, '手机号不能为空')),
  email: v.pipe(v.string(), v.minLength(1, '电子邮箱不能为空'), v.email('请输入有效的邮箱地址')),
  clinicName: v.pipe(v.string(), v.minLength(1, '诊所名称不能为空')),
  clinicAddress: v.pipe(v.string(), v.minLength(1, '诊所地址不能为空')),
  specialization: v.string(),
  loginAccount: v.pipe(v.string(), v.minLength(1, '登录账号不能为空')),
  loginPassword: v.pipe(v.string(), v.minLength(6, '登录密码至少6位')),
  remarks: v.string(),
})

type Schema = v.InferOutput<typeof schema>

export default defineComponent({
  name: 'CreateDoctorComponent',
  setup() {
    const state = reactive({
      doctorName: '',
      phoneNumber: '',
      email: '',
      clinicName: '',
      clinicAddress: '',
      specialization: '',
      loginAccount: '',
      loginPassword: '',
      remarks: '',
    })

    const specializationOptions = [
      { label: '口腔种植', value: '口腔种植' },
      { label: '口腔修复', value: '口腔修复' },
      { label: '口腔正畸', value: '口腔正畸' },
      { label: '口腔外科', value: '口腔外科' },
      { label: '牙体牙髓', value: '牙体牙髓' },
      { label: '牙周病科', value: '牙周病科' },
      { label: '儿童口腔', value: '儿童口腔' },
      { label: '口腔预防', value: '口腔预防' },
    ]

    const toast = useToast()
    const router = useRouter()

    const handleCancel = () => {
      // Reset form or navigate back
      Object.assign(state, {
        doctorName: '',
        phoneNumber: '',
        email: '',
        clinicName: '',
        clinicAddress: '',
        specialization: '',
        loginAccount: '',
        loginPassword: '',
        remarks: '',
      })
      router.go(-1)
    }

    const onSubmit = async (event: FormSubmitEvent<Schema>) => {
      toast.add({ title: '成功', description: '医生信息已保存', color: 'success' })
      console.log('Saving doctor:', event.data)

      router.go(-1)
    }

    return () => (
      <div class="w-full max-w-4xl">
        <div class="space-y-8">
          {/* Header */}
          <div class="text-center">
            <div class="flex items-center justify-center mb-3">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  class="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h1 class="text-2xl font-semibold text-foreground">新增医生</h1>
            <p class="text-muted-foreground mt-2">添加新的医生到系统中</p>
          </div>

          <UDivider />

          <UForm schema={schema} state={state} onSubmit={onSubmit}>
            {/* Form Fields */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-foreground border-l-4 border-primary pl-3">
                  基本信息
                </h3>

                <UFormField label="医生姓名" name="doctorName">
                  <UInput
                    v-model={state.doctorName}
                    placeholder="请输入医生姓名"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="手机号" name="phoneNumber">
                  <UInput
                    v-model={state.phoneNumber}
                    placeholder="请输入手机号"
                    type="tel"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="电子邮箱" name="email">
                  <UInput
                    v-model={state.email}
                    placeholder="请输入电子邮箱"
                    type="email"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="专业领域" name="specialization">
                  <USelect
                    v-model={state.specialization}
                    items={specializationOptions}
                    placeholder="选择专业领域"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>
              </div>

              {/* Clinic Information */}
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-foreground border-l-4 border-success pl-3">
                  诊所信息
                </h3>

                <UFormField label="诊所名称" name="clinicName">
                  <UInput
                    v-model={state.clinicName}
                    placeholder="请输入诊所名称"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="诊所地址" name="clinicAddress">
                  <UTextarea
                    v-model={state.clinicAddress}
                    placeholder="请输入详细地址"
                    rows={3}
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="登录账号" name="loginAccount">
                  <UInput
                    v-model={state.loginAccount}
                    placeholder="请输入登录账号"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="登录密码" name="loginPassword">
                  <UInput
                    v-model={state.loginPassword}
                    type="password"
                    placeholder="请输入登录密码"
                    size="lg"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>

            {/* Remarks */}
            <div class="mt-6">
              <UFormField label="备注信息" name="remarks">
                <UTextarea
                  v-model={state.remarks}
                  placeholder="请输入备注信息（可选）"
                  rows={3}
                  class="w-full"
                />
              </UFormField>
            </div>

            {/* Action Buttons */}
            <div class="flex gap-4 mt-6">
              <UButton variant="outline" size="lg" class="flex-1" onClick={handleCancel}>
                <span class="mx-auto">取消</span>
              </UButton>
              <UButton type="submit" color="primary" size="lg" class="flex-1">
                <span class="mx-auto">保存医生信息</span>
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    )
  },
})
