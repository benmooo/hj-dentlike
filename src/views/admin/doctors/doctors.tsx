import { defineComponent, reactive } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UTable from '@nuxt/ui/components/Table.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'
import UToggle from '@nuxt/ui/components/Switch.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DoctorsComponent',
  setup() {
    const filters = reactive({
      employeeInfo: '',
      clinicName: '',
    })

    const columns = [
      { key: 'actions', label: '操作' },
      { key: 'doctorName', label: '医生姓名' },
      { key: 'phoneNumber', label: '手机号' },
      { key: 'email', label: '电子邮箱' },
      { key: 'clinicName', label: '诊所名称' },
      { key: 'clinicAddress', label: '门诊地址' },
      { key: 'registrationTime', label: '注册时间' },
      { key: 'accountStatus', label: '账号状态' },
      { key: 'remarks', label: '备注' },
    ]

    const doctors = [
      {
        id: 1,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
      {
        id: 2,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
      {
        id: 3,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
      {
        id: 4,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
      {
        id: 5,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
      {
        id: 6,
        doctorName: '李磊',
        phoneNumber: '17656776567',
        email: '16775345@yahu.com',
        clinicName: '澳洲乐民口腔门诊',
        clinicAddress: '澳洲 xxxxxxxxxxxxxxxxxxxxxxx号',
        registrationTime: '2025-07-20 15:30',
        accountStatus: true,
        remarks: '',
      },
    ]

    const handleToggleStatus = (doctor: (typeof doctors)[0]) => {
      doctor.accountStatus = !doctor.accountStatus
    }

    const router = useRouter()
    const onCreateDoctor = () => {
      router.push('/admin/doctors/create')
    }

    return () => (
      <div class="space-y-6">
        {/* Filters Section */}
        <div class="flex items-end gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium">员工信息</label>
            <UInput v-model={filters.employeeInfo} placeholder="姓名/手机号/邮箱" class="w-72" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium">诊所名称</label>
            <UInput v-model={filters.clinicName} placeholder="诊所名称" class="w-64" />
          </div>
          <UButton color="primary" icon="i-heroicons-magnifying-glass">
            查询
          </UButton>
          <UButton variant="outline" icon="i-heroicons-arrow-path">
            重置
          </UButton>
        </div>

        {/* Add Doctor Button */}
        <div>
          <UButton onClick={onCreateDoctor} color="primary" icon="i-heroicons-plus" size="lg">
            新增医生
          </UButton>
        </div>

        {/* Doctors Table */}
        <div>
          <UTable data={doctors} />

          <div class="flex justify-between items-center mt-4">
            <p class="text-sm text-muted-foreground">
              显示1-{doctors.length}, 共{doctors.length}条数据
            </p>
            <div class="flex items-center gap-4">
              <UPagination total={100} sibling-count={1} show-edges />
            </div>
          </div>
        </div>
      </div>
    )
  },
})
