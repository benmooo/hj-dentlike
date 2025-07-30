import { defineComponent, reactive } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTable from '@nuxt/ui/components/Table.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'

export default defineComponent({
  name: 'OrdersComponent',
  setup() {
    const filters = reactive({
      doctorName: '',
      patientName: '',
      orderId: '',
      status: '全部',
      caseType: '',
      dueDate: '',
      orderDate: '',
    })

    const statusOptions = ['全部', '待确认', '待审核', '进行中', '已完成']
    const caseTypeOptions = ['全部', '冠', '嵌体/高嵌', '贴面', '桥体']

    const columns = [
      { key: 'actions', label: '操作' },
      { key: 'doctorName', label: '医生姓名' },
      { key: 'patientName', label: '患者姓名' },
      { key: 'orderNumber', label: '订单号' },
      { key: 'status', label: '订单状态' },
      { key: 'caseType', label: '病例类型' },
      { key: 'dueDate', label: '戴牙日期' },
      { key: 'orderDate', label: '录单时间' },
      { key: 'toothPosition', label: '牙位' },
      { key: 'remarks', label: '备注' },
    ]

    const orders = [
      {
        id: 1,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待确认',
        caseType: '冠',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '3',
        remarks: '',
      },
      {
        id: 2,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待审核',
        caseType: '嵌体/高嵌',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '5',
        remarks: '',
      },
      {
        id: 3,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待确认',
        caseType: '冠',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '3',
        remarks: '',
      },
      {
        id: 4,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待审核',
        caseType: '嵌体/高嵌',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '5',
        remarks: '',
      },
      {
        id: 5,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待确认',
        caseType: '冠',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '3',
        remarks: '',
      },
      {
        id: 6,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待审核',
        caseType: '嵌体/高嵌',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '5',
        remarks: '',
      },
      {
        id: 7,
        doctorName: '张飞',
        patientName: '刘备',
        orderNumber: '202506190010',
        status: '待审核',
        caseType: '嵌体/高嵌',
        dueDate: '2025-06-25',
        orderDate: '2025-06-07 13:58',
        toothPosition: '5',
        remarks: '',
      },
    ]

    const statusColorMap: Record<string, string> = {
      待确认: 'bg-blue-500',
      待审核: 'bg-orange-400',
      进行中: 'bg-yellow-500',
      已完成: 'bg-green-500',
    }

    const tableSlots = {
      'status-data': ({ row }: { row: (typeof orders)[0] }) => (
        <div class="flex items-center">
          <span
            class={`h-2.5 w-2.5 rounded-full mr-2 ${statusColorMap[row.status] || 'bg-gray-400'}`}
          ></span>
          <span>{row.status}</span>
        </div>
      ),
      'actions-data': ({ row }: { row: (typeof orders)[0] }) => (
        <div class="flex items-center gap-1">
          <UButton variant="link" color="primary" size="xs">
            查看
          </UButton>
          <UButton variant="link" color="secondary" size="xs">
            进度
          </UButton>
          <UButton variant="link" color="warning" size="xs">
            物流
          </UButton>
        </div>
      ),
      'toothPosition-data': ({ row }: { row: (typeof orders)[0] }) => (
        <div class="border-l border-gray-600 pl-4 h-6 flex items-center">{row.toothPosition}</div>
      ),
      'remarks-data': ({ row }: { row: (typeof orders)[0] }) => (
        <div class="border-l border-gray-600 pl-4 h-6 flex items-center">{row.remarks}</div>
      ),
    }

    return () => (
      <div>
        {/* Filters */}
        <div class="mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
            <div class="flex flex-col gap-1">
              <label class="text-sm">医生姓名</label>
              <UInput v-model={filters.doctorName} placeholder="医生姓名" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">患者姓名</label>
              <UInput v-model={filters.patientName} placeholder="患者姓名" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">订单号</label>
              <UInput v-model={filters.orderId} placeholder="订单号" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">订单状态</label>
              <USelect v-model={filters.status} items={statusOptions} />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">病例类型</label>
              <UInput v-model={filters.caseType} placeholder="病例类型" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">戴牙日期</label>
              <UInput v-model={filters.dueDate} placeholder="戴牙日期" type="date" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm">录单时间</label>
              <UInput v-model={filters.orderDate} placeholder="录单时间" type="date" />
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <UButton>查询</UButton>
            <UButton variant="outline">重置</UButton>
          </div>
        </div>

        {/* Table Section */}
        <div>
          <div class="flex justify-between items-center mb-4">
            <UButton size="lg" icon="i-heroicons-plus-circle-solid">
              新增订单
            </UButton>
            <UButton variant="outline">导出报表</UButton>
          </div>

          <UTable data={orders} />
          <div class="flex justify-between items-center mt-4">
            <p class="text-sm text-gray-400">显示 1-7, 共 {orders.length} 条数据</p>
            <UPagination total={100} sibling-count={1} show-edges />
          </div>
        </div>
      </div>
    )
  },
})
