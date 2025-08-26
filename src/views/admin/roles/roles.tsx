import { defineComponent, reactive, ref } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTable, { type TableColumn } from '@nuxt/ui/components/Table.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'
import { useRouter } from 'vue-router'
import UModal from '@nuxt/ui/components/Modal.vue'
import Placeholder from '@/components/common/placeholder'

export default defineComponent({
  name: 'RolesComponent',
  setup() {
    const filters = reactive({
      roleName: '全部',
    })

    const roleNameOptions = ['全部', '临床医生', '工厂技术人员', '工厂接单人员', '翻译员', '管理员']

    const roles: Role[] = [
      {
        id: 1,
        roleName: '临床医生',
        roleDescription: '医生下单，订单查询',
        userCount: 230,
        updateTime: '2025-07-20 15:30',
        permissions: ['订单管理', '患者管理'],
      },
      {
        id: 2,
        roleName: '工厂技术人员',
        roleDescription: '订单查询，上传方案，医技沟通（订单沟通）',
        userCount: 5,
        updateTime: '2025-07-20 15:30',
        permissions: ['订单查询', '方案上传', '医技沟通'],
      },
      {
        id: 3,
        roleName: '工厂接单人员',
        roleDescription: '订单查询，医技沟通（整体沟通），添加运单号',
        userCount: 8,
        updateTime: '2025-07-20 15:30',
        permissions: ['订单查询', '医技沟通', '运单管理'],
      },
      {
        id: 4,
        roleName: '翻译员',
        roleDescription: '订单翻译申报',
        userCount: 6,
        updateTime: '2025-07-20 15:30',
        permissions: ['翻译申报'],
      },
      {
        id: 5,
        roleName: '管理员',
        roleDescription: '可以查看系统所有数据，进行所有操作，且拥有不允许编辑、删除',
        userCount: 1,
        updateTime: '2025-07-20 15:30',
        permissions: ['系统管理', '用户管理', '权限管理', '数据查看'],
      },
    ]
    const toast = useToast()
    const router = useRouter()

    const handleViewPermissions = (role: Role) => {
      router.push({ path: `/admin/roles/${role.id}` })
    }

    const handleEditRole = (role: Role) => {
      router.push({ path: `/admin/roles/${role.id}` })
    }

    const handleDeleteRole = (role: Role) => {
      console.log('删除职务:', role)
    }

    const handleEditPermissions = (role: Role) => {
      console.log('编辑权限:', role)
    }

    const handleAddRole = () => {
      toast.add({ title: 'Unavailable' })
    }

    const handleQuery = () => {
      console.log('查询:', filters)
    }

    const handleReset = () => {
      filters.roleName = '全部'
    }
    const open = ref(false)

    const columns: TableColumn<Role>[] = [
      {
        accessorKey: 'id',
        cell: ({ row }) => row.original.id,
      },
      {
        accessorKey: 'roleName',
        header: '角色名称',
        cell: ({ row }) => row.original.roleName,
      },
      {
        accessorKey: 'roleDescription',
        header: '角色描述',
        cell: ({ row }) => row.original.roleDescription,
      },
      {
        accessorKey: 'userCount',
        header: '用户数量',
        cell: ({ row }) => row.original.userCount,
      },
      {
        accessorKey: 'updateTime',
        header: '更新时间',
        cell: ({ row }) => row.original.updateTime,
      },
      {
        accessorKey: 'permissions',
        header: '权限',
        cell: ({ row }) => row.original.permissions.map((permission) => permission).join(', '),
      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <div class="flex gap-2">
            <UButton
              size="sm"
              variant="outline"
              color="info"
              icon="i-lucide-info"
              onClick={() => handleViewPermissions(row.original)}
            >
              查看
            </UButton>
            <UButton
              size="sm"
              variant="outline"
              color="primary"
              icon="i-lucide-pen"
              onClick={() => handleEditRole(row.original)}
            >
              编辑
            </UButton>

            <UModal
              v-model={open.value}
              title="Are you sure?"
              description="This role will be permanently deleted."
              ui={{ footer: 'justify-end' }}
            >
              {{
                default: () => (
                  <UButton
                    size="sm"
                    variant="outline"
                    color="error"
                    icon="i-lucide-trash"
                    onClick={() => handleDeleteRole(row.original)}
                  >
                    删除
                  </UButton>
                ),
                footer: ({ close }: { close: () => void }) => (
                  <div class="flex items-center gap-2">
                    <UButton label="Cancel" variant="outline" onClick={close} />
                    <UButton label="Submit" />
                  </div>
                ),
                // body: () => <Placeholder class="h-48" />,
              }}
            </UModal>
          </div>
        ),
      },
    ]
    return () => (
      <div>
        {/* Filters */}
        <div class="mb-6">
          <div class="flex items-end gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm text-muted-foreground">职务名称</label>
              <USelect v-model={filters.roleName} items={roleNameOptions} class="w-48" />
            </div>
            <div class="flex gap-2">
              <UButton onClick={handleQuery} color="primary" icon="i-heroicons-magnifying-glass">
                查询
              </UButton>
              <UButton onClick={handleReset} variant="outline" icon="i-heroicons-arrow-path">
                重置
              </UButton>
            </div>
          </div>
        </div>

        {/* Add Role Button */}
        <div class="mb-4">
          <UButton onClick={handleAddRole} icon="i-heroicons-plus-circle-solid" color="primary">
            新增职务
          </UButton>
        </div>

        {/* Table */}
        <div>
          <UTable data={roles} columns={columns} />

          <div class="flex justify-between items-center mt-4">
            <p class="text-sm text-gray-400">显示 1-7, 共 {roles.length} 条数据</p>
            <UPagination total={100} sibling-count={1} show-edges />
          </div>
        </div>
      </div>
    )
  },
})

export type Role = {
  id: number
  roleName: string
  roleDescription: string
  userCount: number
  updateTime: string
  permissions: string[]
}
