import { defineComponent, reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
import { useRouter } from 'vue-router'

const schema = v.object({
  roleName: v.pipe(v.string(), v.minLength(1, '角色名称不能为空')),
  roleDescription: v.pipe(v.string(), v.minLength(1, '角色描述不能为空')),
})

type Schema = v.InferOutput<typeof schema>

export default defineComponent({
  name: 'CreateRoleComponent',
  setup() {
    const state = reactive({
      roleName: '',
      roleDescription: '',
    })

    const permissions = reactive({
      systemLogin: false,
      orderEntry: false,
      orderManagement: {
        viewOrders: false,
        viewProgress: false,
        editOrders: false,
        cancelOrders: false,
        medicalCommunication: false,
        addTrackingNumber: false,
      },
      personnelManagement: {
        viewPersonnel: false,
        addPersonnel: false,
        editPersonnel: false,
        deletePersonnel: false,
        userAccounts: false,
        updatePasswords: false,
        editDoctors: false,
        deleteDoctors: false,
      },
      productManagement: {
        productManagement: false,
      },
      billManagement: {
        billQuery: false,
        billSummary: false,
        billTotal: false,
      },
      translationReview: {
        translationReview: false,
      },
    })

    const permissionGroups = [
      {
        id: 'system',
        name: '系统登录',
        permissions: [{ key: 'systemLogin', label: '系统登录', value: permissions.systemLogin }],
      },
      {
        id: 'order',
        name: '录单',
        permissions: [{ key: 'orderEntry', label: '录单', value: permissions.orderEntry }],
      },
      {
        id: 'orderMgmt',
        name: '订单管理',
        permissions: [
          { key: 'viewOrders', label: '查看订单', value: permissions.orderManagement.viewOrders },
          {
            key: 'viewProgress',
            label: '查看加工进度',
            value: permissions.orderManagement.viewProgress,
          },
          { key: 'editOrders', label: '编辑订单', value: permissions.orderManagement.editOrders },
          {
            key: 'cancelOrders',
            label: '作废订单',
            value: permissions.orderManagement.cancelOrders,
          },
          {
            key: 'medicalCommunication',
            label: '医技沟通',
            value: permissions.orderManagement.medicalCommunication,
          },
          {
            key: 'addTrackingNumber',
            label: '添加运单号',
            value: permissions.orderManagement.addTrackingNumber,
          },
        ],
      },
      {
        id: 'personnel',
        name: '人员管理',
        permissions: [
          {
            key: 'viewPersonnel',
            label: '查看员工',
            value: permissions.personnelManagement.viewPersonnel,
          },
          {
            key: 'addPersonnel',
            label: '新增员工',
            value: permissions.personnelManagement.addPersonnel,
          },
          {
            key: 'editPersonnel',
            label: '编辑员工',
            value: permissions.personnelManagement.editPersonnel,
          },
          {
            key: 'deletePersonnel',
            label: '删除员工',
            value: permissions.personnelManagement.deletePersonnel,
          },
          {
            key: 'userAccounts',
            label: '启用/停用账号',
            value: permissions.personnelManagement.userAccounts,
          },
          {
            key: 'updatePasswords',
            label: '更改密码',
            value: permissions.personnelManagement.updatePasswords,
          },
          {
            key: 'editDoctors',
            label: '编辑医生',
            value: permissions.personnelManagement.editDoctors,
          },
          {
            key: 'deleteDoctors',
            label: '删除医生',
            value: permissions.personnelManagement.deleteDoctors,
          },
        ],
      },
      {
        id: 'product',
        name: '产品管理',
        permissions: [
          {
            key: 'productManagement',
            label: '产品管理',
            value: permissions.productManagement.productManagement,
          },
        ],
      },
      {
        id: 'billing',
        name: '账单管理',
        permissions: [
          { key: 'billQuery', label: '账单查询', value: permissions.billManagement.billQuery },
          { key: 'billSummary', label: '账单工总', value: permissions.billManagement.billSummary },
          { key: 'billTotal', label: '账单总计', value: permissions.billManagement.billTotal },
        ],
      },
      {
        id: 'translation',
        name: '翻译审核',
        permissions: [
          {
            key: 'translationReview',
            label: '翻译审核',
            value: permissions.translationReview.translationReview,
          },
        ],
      },
    ]

    const toast = useToast()
    const router = useRouter()

    const handleCancel = () => {
      router.go(-1)
    }

    const updatePermission = (groupId: string, permissionKey: string, value: boolean) => {
      console.log('Checkbox value changed:', groupId, permissionKey, value)

      if (groupId === 'system') {
        permissions.systemLogin = value
      } else if (groupId === 'order') {
        permissions.orderEntry = value
      } else if (groupId === 'orderMgmt') {
        permissions.orderManagement[permissionKey as keyof typeof permissions.orderManagement] =
          value
      } else if (groupId === 'personnel') {
        permissions.personnelManagement[
          permissionKey as keyof typeof permissions.personnelManagement
        ] = value
      } else if (groupId === 'product') {
        permissions.productManagement[permissionKey as keyof typeof permissions.productManagement] =
          value
      } else if (groupId === 'billing') {
        permissions.billManagement[permissionKey as keyof typeof permissions.billManagement] = value
      } else if (groupId === 'translation') {
        permissions.translationReview[permissionKey as keyof typeof permissions.translationReview] =
          value
      }
    }

    const validatePermissions = (): boolean => {
      // Check if at least one permission is selected
      const hasSystemLogin = permissions.systemLogin
      const hasOrderEntry = permissions.orderEntry
      const hasOrderMgmt = Object.values(permissions.orderManagement).some(Boolean)
      const hasPersonnelMgmt = Object.values(permissions.personnelManagement).some(Boolean)
      const hasProductMgmt = Object.values(permissions.productManagement).some(Boolean)
      const hasBillMgmt = Object.values(permissions.billManagement).some(Boolean)
      const hasTranslationReview = Object.values(permissions.translationReview).some(Boolean)

      return (
        hasSystemLogin ||
        hasOrderEntry ||
        hasOrderMgmt ||
        hasPersonnelMgmt ||
        hasProductMgmt ||
        hasBillMgmt ||
        hasTranslationReview
      )
    }

    const onSubmit = async (event: FormSubmitEvent<Schema>) => {
      // Validate permissions
      if (!validatePermissions()) {
        toast.add({
          title: '验证失败',
          description: '请至少选择一个权限',
          color: 'error',
        })
        return
      }

      try {
        const roleData = {
          ...event.data,
          permissions: permissions,
        }

        console.log('Creating role:', roleData)

        toast.add({
          title: '成功',
          description: '角色已创建',
          color: 'success',
        })

        router.go(-1)
      } catch (error) {
        toast.add({
          title: '错误',
          description: '角色创建失败',
          color: 'error',
        })
      }
    }

    return () => (
      <div class="max-w-5xl">
        <div class="space-y-6">
          {/* Header */}
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-foreground">新增角色</h1>
          </div>

          <UForm schema={schema} state={state} onSubmit={onSubmit}>
            <div class="space-y-6">
              {/* Basic Information */}
              <UCard>
                <div class="space-y-4">
                  <h2 class="text-lg font-medium text-foreground">基本信息</h2>

                  {/* Role Name */}
                  <UFormField label="角色名称" name="roleName" required>
                    <UInput
                      v-model={state.roleName}
                      placeholder="请输入角色名称"
                      size="lg"
                      class="w-full"
                    />
                  </UFormField>

                  {/* Role Description */}
                  <UFormField label="角色描述" name="roleDescription" required>
                    <UTextarea
                      v-model={state.roleDescription}
                      placeholder="请输入角色描述"
                      rows={3}
                      class="w-full"
                    />
                  </UFormField>
                </div>
              </UCard>

              {/* Permissions */}
              <UCard>
                <div class="space-y-4">
                  <h2 class="text-lg font-medium text-foreground">权限设置</h2>

                  <div class="space-y-4">
                    {/* Permission Headers */}
                    <div class="grid grid-cols-6 gap-4">
                      <h3 class="col-span-1 text-sm text-muted-foreground">模块</h3>
                      <h3 class="col-span-5 text-sm text-muted-foreground">权限</h3>
                    </div>
                    <UDivider />

                    {/* Permission Groups */}
                    <div class="space-y-6">
                      {permissionGroups.map((group) => (
                        <div key={group.id} class="grid grid-cols-6 gap-4 items-center">
                          <div class="col-span-1 py-2">
                            <span class="text-sm text-muted-foreground">{group.name}</span>
                          </div>
                          <div class="col-span-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {group.permissions.map((permission) => (
                              <div key={permission.key} class="flex items-center space-x-2">
                                <UCheckbox
                                  // modelValue={permission.value}
                                  value={permission}
                                  onUpdate:modelValue={(value) =>
                                    updatePermission(group.id, permission.key, value as boolean)
                                  }
                                  color="primary"
                                  label={permission.label}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </UCard>
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
