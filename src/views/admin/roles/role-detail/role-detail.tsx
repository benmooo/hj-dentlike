import { defineComponent, reactive, computed } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
import UTabs from '@nuxt/ui/components/Tabs.vue'
import type { TabsItem } from '@nuxt/ui'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import Placeholder from '@/components/common/placeholder'

export default defineComponent({
  name: 'RoleDetailComponent',
  setup() {
    const roleData = reactive({
      id: 1,
      name: '临床医生',
      description: '医生下单，订单查询',
      userCount: 124,
    })

    const permissions = reactive({
      systemLogin: true,
      orderEntry: true,
      orderManagement: {
        viewOrders: true,
        viewProgress: true,
        editOrders: true,
        cancelOrders: true,
        medicalCommunication: true,
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
        billQuery: true,
        billSummary: true,
        billTotal: true,
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

    const handleEditRole = () => {
      console.log('编辑职务')
    }

    const handleDeleteRole = () => {
      console.log('删除职务')
    }

    const handleViewPersonnel = () => {
      console.log('查看人员列表')
    }

    const handleCancel = () => {
      console.log('取消')
    }

    const handleSave = () => {
      console.log('保存权限设置', permissions)
    }

    const updatePermission = (groupId: string, permissionKey: string, value: boolean) => {
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

    const items = [
      {
        label: '权限管理',
        description: "Make changes to your account here. Click save when you're done.",
        icon: 'i-lucide-shield',
        slot: 'permissions' as const,
      },
      {
        label: '人员列表',
        description: "Change your password here. After saving, you'll be logged out.",
        icon: 'i-lucide-user',
        slot: 'users' as const,
      },
    ] satisfies TabsItem[]

    return () => (
      <div class="space-y-6">
        {/* Header */}
        <UCard>
          <div class="flex items-start justify-between">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <UAvatar icon="i-lucide-circle-user-round" size="xl" class="bg-primary/20" />
                <div>
                  <h1 class="text-xl font-semibold text-foreground">{roleData.name}</h1>
                  <p class="text-muted text-sm">{roleData.description}</p>
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <UButton
                onClick={handleDeleteRole}
                icon="i-heroicons-trash"
                color="error"
                variant="outline"
              >
                删除角色
              </UButton>
            </div>
          </div>
        </UCard>

        {/* Navigation */}
        <UTabs items={items} variant="pill" ui={{ trigger: 'grow' }} class="gap-4 w-full">
          {{
            permissions: () => (
              <UCard>
                <div class="space-y-4">
                  {/* Header */}
                  <div class="grid grid-cols-6 gap-4">
                    <h3 class="col-span-1 text-sm text-muted">模块</h3>
                    <h3 class="col-span-5 text-sm text-muted">权限</h3>
                  </div>
                  <UDivider />
                  {/* Permission Groups */}
                  <div class="space-y-6">
                    {permissionGroups.map((group) => (
                      <div key={group.id} class="grid grid-cols-6 gap-4 items-center">
                        <div class="col-span-1 py-2">
                          <span class="text-sm text-muted">{group.name}</span>
                        </div>
                        <div class="col-span-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {group.permissions.map((permission) => (
                            <div key={permission.key} class="flex items-center space-x-2">
                              <UCheckbox
                                modelValue={permission.value}
                                // onUpdate:modelValue={(value) => updatePermission(group.id, permission.key, value)}
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

                <div class="flex justify-center gap-4 mt-6">
                  <UButton onClick={handleCancel} variant="outline" size="lg" icon="i-lucide-x">
                    取消
                  </UButton>
                  <UButton onClick={handleSave} color="primary" size="lg" icon="i-lucide-check">
                    保存
                  </UButton>
                </div>
              </UCard>
            ),
            users: () => <Placeholder class="w-full aspect-video">Unavailable</Placeholder>,
          }}
        </UTabs>
      </div>
    )
  },
})

export type OrderManagement = {
  viewOrders: boolean
  viewProgress: boolean
  editOrders: boolean
  cancelOrders: boolean
  medicalCommunication: boolean
  addTrackingNumber: boolean
}
