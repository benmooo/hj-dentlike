import { defineComponent, ref, reactive } from 'vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UTable from '@nuxt/ui/components/Table.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const isAddClinicModalOpen = ref(false)

    // User data
    const userInfo = reactive({
      name: '杰洛特',
      email: '1567887578@qq.com',
      phone: '18765633345',
      avatar: '/api/placeholder/80/80',
    })

    // Clinic form data
    const clinicForm = reactive({
      name: '',
      country: '',
      address: '',
      postalCode: '',
      status: 'enabled',
    })

    // Clinics data
    const clinics = ref([
      {
        id: 1,
        name: '杭州老百姓牙科诊所',
        address: '中国 浙江省杭州市拱墅区七古登华文创园A3-5F',
        postalCode: '310000',
        status: 'enabled',
      },
      {
        id: 2,
        name: '宁波老百姓牙科诊所',
        address: '中国 浙江省宁波市鄞州区华文创园A3-5F',
        postalCode: '315000',
        status: 'enabled',
      },
    ])

    // Country options
    const countryOptions = ref([
      { label: '中国', value: 'china' },
      { label: '美国', value: 'usa' },
      { label: '英国', value: 'uk' },
      { label: '日本', value: 'japan' },
    ])

    // Status options
    const statusOptions = ref([
      { label: '启用', value: 'enabled' },
      { label: '停用', value: 'disabled' },
    ])

    // Table columns
    const columns = [
      { key: 'edit', label: '编辑' },
      { key: 'name', label: '门诊名称' },
      { key: 'address', label: '门诊地址' },
      { key: 'postalCode', label: '邮政编码' },
      { key: 'status', label: '状态' },
    ]

    const openAddClinicModal = () => {
      isAddClinicModalOpen.value = true
    }

    const closeAddClinicModal = () => {
      isAddClinicModalOpen.value = false
      // Reset form
      Object.assign(clinicForm, {
        name: '',
        country: '',
        address: '',
        postalCode: '',
        status: 'enabled',
      })
    }

    const saveClinic = () => {
      // Add new clinic
      const newClinic = {
        id: Date.now(),
        name: clinicForm.name,
        address: clinicForm.address,
        postalCode: clinicForm.postalCode,
        status: clinicForm.status,
      }
      clinics.value.push(newClinic)
      closeAddClinicModal()
    }

    const editClinic = (clinic: Clinic) => {
      // Handle edit clinic
      console.log('Edit clinic:', clinic)
    }

    return () => (
      <div class="min-h-screen bg-muted/30">
        {/* Header Section with Mountain Background */}
        <div class="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAxMjAwIDI1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGY0NmU1O3N0b3Atb3BhY2l0eTowLjMiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA2YjZkNDtzdG9wLW9wYWNpdHk6MC41IiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjI1NiIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPHBhdGggZD0iTTAgMjU2TDE1MCAyMDBMMzAwIDE4MEw0NTAgMTUwTDYwMCAxMjBMNzUwIDEwMEw5MDAgMTMwTDEwNTAgMTYwTDEyMDAgMTkwVjI1NkgwWiIgZmlsbD0iIzFmMjkzNyIgZmlsbC1vcGFjaXR5PSIwLjgiLz4KPHBhdGggZD0iTTAgMjU2TDEyMCAyMjBMMjQwIDE4MEwzNjAgMTYwTDQ4MCAxNDBMNjAwIDEwMEw3MjAgMTIwTDg0MCA4MEw5NjAgMTAwTDEwODAgMTMwTDEyMDAgMTUwVjI1NkgwWiIgZmlsbD0iIzM3NDE1MSIgZmlsbC1vcGFjaXR5PSIwLjYiLz4KPC9zdmc+')`,
            }}
          />
          <div class="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />

          {/* User Info Overlay */}
          <div class="absolute bottom-8 left-8 flex items-end gap-6">
            <UAvatar
              src={userInfo.avatar}
              alt={userInfo.name}
              size="xl"
              class="ring-4 ring-background shadow-xl"
            />
            <div class="text-foreground mb-2">
              <h1 class="text-3xl font-bold mb-1">{userInfo.name}</h1>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          {/* Personal Information Card */}
          <UCard>
            <div class="flex items-center gap-3 mb-6">
              <UButton icon="i-lucide-user" size="sm" />
              <h2 class="text-xl font-semibold">个人信息</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-muted-foreground">姓名</label>
                <p class="text-foreground">{userInfo.name}</p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-muted-foreground">电子邮箱</label>
                <p class="text-foreground">{userInfo.email}</p>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-muted-foreground">联系电话</label>
                <p class="text-foreground">{userInfo.phone}</p>
              </div>
            </div>
          </UCard>

          {/* Clinic Information Card */}
          <UCard class="shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <UButton icon="i-lucide-building" size="sm" />
                <h2 class="text-xl font-semibold">诊所信息</h2>
              </div>
              <UButton color="primary" icon="heroicons:plus" to="/client/user/practices/create">
                添加诊所
              </UButton>
            </div>

            <UTable
              // columns={columns}
              data={clinics.value}
              v-slots={{
                edit: ({ row }: { row: Clinic }) => (
                  <UButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    icon="heroicons:pencil"
                    onClick={() => editClinic(row)}
                  />
                ),
                status: ({ row }: { row: Clinic }) => (
                  <UButton
                    color={row.status === 'enabled' ? 'primary' : 'secondary'}
                    variant="soft"
                    size="sm"
                  >
                    {row.status === 'enabled' ? '启用' : '停用'}
                  </UButton>
                ),
              }}
            />
          </UCard>
        </div>

        {/* Add Clinic Modal */}
      </div>
    )
  },
})

export type Clinic = {
  id: string
  name: string
  address: string
  postalCode: string
  status: string
}
