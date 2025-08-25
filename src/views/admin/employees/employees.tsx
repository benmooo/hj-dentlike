import { defineComponent, reactive } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTable from '@nuxt/ui/components/Table.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'
import UToggle from '@nuxt/ui/components/Switch.vue'

export default defineComponent({
  name: 'EmployeesComponent',
  setup() {
    const filters = reactive({
      employeeInfo: '',
      jobTitle: '全部',
    })

    const jobTitleOptions = ['全部', '管理员', '医生', '技师', '客服', '财务']

    // const columns = [
    //   { key: 'actions', label: '操作' },
    //   { key: 'employeeName', label: '员工姓名' },
    //   { key: 'phoneNumber', label: '手机号' },
    //   { key: 'jobTitle', label: '职务名称' },
    //   { key: 'remarks', label: '备注' },
    //   { key: 'accountStatus', label: '账号状态' },
    // ]

    const employees = [
      {
        id: 1,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 2,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 3,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 4,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 5,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 6,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
      {
        id: 7,
        employeeName: '李磊',
        phoneNumber: '17656776567',
        jobTitle: '管理员',
        remarks: '',
        accountStatus: true,
      },
    ]

    const handleToggleStatus = (employee: (typeof employees)[0]) => {
      employee.accountStatus = !employee.accountStatus
    }

    const tableSlots = {
      'actions-data': ({ row }: { row: (typeof employees)[0] }) => (
        <div class="flex items-center gap-1">
          <UButton variant="solid" color="primary" size="xs">
            编辑
          </UButton>
          <UButton variant="solid" color="warning" size="xs">
            删除
          </UButton>
          <UButton variant="solid" color="success" size="xs">
            修改密码
          </UButton>
        </div>
      ),
      'accountStatus-data': ({ row }: { row: (typeof employees)[0] }) => (
        <UToggle v-model={row.accountStatus} onUpdate:modelValue={() => handleToggleStatus(row)} />
      ),
      'remarks-data': ({ row }: { row: (typeof employees)[0] }) => (
        <span>{row.remarks || '-'}</span>
      ),
    }

    return () => (
      <div class="space-y-6">
        {/* Filters Section */}
        <div class="flex items-end gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium">员工信息</label>
            <UInput v-model={filters.employeeInfo} placeholder="姓名/手机号" class="w-64" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium">职务名称</label>
            <USelect v-model={filters.jobTitle} items={jobTitleOptions} class="w-48" />
          </div>
          <UButton color="primary" icon="i-heroicons-magnifying-glass">
            查询
          </UButton>
          <UButton variant="outline" icon="i-heroicons-arrow-path">
            重置
          </UButton>
        </div>

        {/* Add Employee Button */}
        <div>
          <UButton color="primary" icon="i-heroicons-plus" size="lg">
            新增员工
          </UButton>
        </div>

        {/* Employees Table */}
        <div>
          <UTable
            data={employees}
            // v-slots={tableSlots}
          />

          <div class="flex justify-between items-center mt-4">
            <p class="text-sm text-muted-foreground">
              显示1-{employees.length}, 共{employees.length}条数据
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
