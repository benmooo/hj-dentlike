import { defineComponent, reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import { useRouter } from 'vue-router'

const schema = v.object({
  employeeName: v.pipe(v.string(), v.minLength(1, '员工姓名不能为空')),
  phoneNumber: v.pipe(v.string(), v.minLength(1, '手机号不能为空')),
  jobTitle: v.pipe(v.string(), v.minLength(1, '职务名称不能为空')),
  loginAccount: v.pipe(v.string(), v.minLength(1, '登录账号不能为空')),
  loginPassword: v.pipe(v.string(), v.minLength(6, '登录密码至少6位')),
  remarks: v.string(),
})

type Schema = v.InferOutput<typeof schema>

export default defineComponent({
  name: 'CreateEmployeeComponent',
  setup() {
    const state = reactive({
      employeeName: '',
      phoneNumber: '',
      jobTitle: '',
      loginAccount: '',
      loginPassword: '',
      remarks: '',
    })

    const jobTitleOptions = [
      { label: '管理员', value: '管理员' },
      { label: '医生', value: '医生' },
      { label: '技师', value: '技师' },
      { label: '客服', value: '客服' },
      { label: '财务', value: '财务' },
    ]

    const toast = useToast()
    const router = useRouter()

    const handleCancel = () => {
      // Reset form or navigate back
      Object.assign(state, {
        employeeName: '',
        phoneNumber: '',
        jobTitle: '',
        loginAccount: '',
        loginPassword: '',
        remarks: '',
      })
      router.go(-1)
    }

    const onSubmit = async (event: FormSubmitEvent<Schema>) => {
      toast.add({ title: '成功', description: '员工信息已保存', color: 'success' })
      console.log('Saving employee:', event.data)

      router.go(-1)
    }

    return () => (
      <div class="container max-w-4xl">
        <div class="space-y-6">
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
            <h1 class="text-2xl font-semibold text-foreground">新增员工</h1>
            <p class="text-muted-foreground mt-2">添加新的员工到系统中</p>
          </div>

          <UForm schema={schema} state={state} onSubmit={onSubmit}>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="员工姓名" name="employeeName">
                <UInput
                  v-model={state.employeeName}
                  placeholder="员工姓名"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="手机号" name="phoneNumber">
                <UInput v-model={state.phoneNumber} placeholder="手机号" size="lg" class="w-full" />
              </UFormField>

              <UFormField label="职务名称" name="jobTitle">
                <USelect
                  v-model={state.jobTitle}
                  items={jobTitleOptions}
                  placeholder="选择职务"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="登录账号" name="loginAccount">
                <UInput
                  v-model={state.loginAccount}
                  placeholder="登录账号"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="登录密码" name="loginPassword">
                <UInput
                  v-model={state.loginPassword}
                  type="password"
                  placeholder="登录密码"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="备注" name="remarks" class="md:col-span-2">
                <UTextarea v-model={state.remarks} placeholder="备注" rows={4} class="w-full" />
              </UFormField>
            </div>

            {/* Action Buttons */}
            <div class="flex gap-2 mt-6">
              <UButton
                variant="outline"
                color="error"
                size="lg"
                onClick={handleCancel}
                class="flex-1"
              >
                取消
              </UButton>
              <UButton type="submit" color="primary" size="lg" class="flex-1">
                保存
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    )
  },
})
