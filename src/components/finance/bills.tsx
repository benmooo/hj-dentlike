import { defineComponent, reactive, ref } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTable, { type TableColumn } from '@nuxt/ui/components/Table.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import type { Column } from '@tanstack/vue-table'

export default defineComponent({
  name: 'BillsComponent',
  setup() {
    const filters = reactive({
      billTime: '',
      patientName: '',
      visitId: '',
      productName: '',
      chargeStatus: '全部',
      doctorName: '',
      totalAmount: '',
    })

    const chargeStatusOptions = ['全部', '已扣费', '未扣费', '退款中', '已退款']

    const columnPinning = ref({
      left: [],
      right: ['remarks'],
    })

    const bills = ref<Bill[]>([
      {
        id: 1,
        billTime: '2025年6月30日',
        visitId: '2025062801',
        doctorName: '华伦',
        patientName: '关羽',
        caseType: '冠',
        productName: '氧化铝',
        toothPosition: '1',
        unitPrice: 200,
        quantity: 1,
        subtotal: 200,
        totalAmount: 1200,
        chargeStatus: '已扣费',
        remarks: '',
      },
      {
        id: 2,
        billTime: '2025年6月30日',
        visitId: '2025062801',
        doctorName: '华伦',
        patientName: '关羽',
        caseType: '高嵌',
        productName: '玻璃陶瓷',
        toothPosition: '34',
        unitPrice: 500,
        quantity: 2,
        subtotal: 1000,
        totalAmount: 1200,
        chargeStatus: '已扣费',
        remarks: '',
      },
      {
        id: 3,
        billTime: '2025年6月30日',
        visitId: '2025062801',
        doctorName: '华伦',
        patientName: '关羽',
        caseType: '冠',
        productName: '氧化铝',
        toothPosition: '1',
        unitPrice: 200,
        quantity: 1,
        subtotal: 200,
        totalAmount: 1200,
        chargeStatus: '已扣费',
        remarks: '',
      },
      {
        id: 4,
        billTime: '2025年6月30日',
        visitId: '2025062801',
        doctorName: '华伦',
        patientName: '关羽',
        caseType: '高嵌',
        productName: '玻璃陶瓷',
        toothPosition: '34',
        unitPrice: 500,
        quantity: 2,
        subtotal: 1000,
        totalAmount: 1200,
        chargeStatus: '未扣费',
        remarks: '',
      },
    ])

    const chargeStatusColorMap: Record<string, string> = {
      已扣费: 'success',
      未扣费: 'warning',
      退款中: 'primary',
      已退款: 'secondary',
    }

    const columns: TableColumn<Bill>[] = [
      {
        accessorKey: 'billTime',
        header: ({ column }) => getHeader(column, '账单时间', 'left'),
        cell: ({ row }) => row.getValue('billTime'),
      },
      {
        accessorKey: 'visitId',
        header: ({ column }) => getHeader(column, '就诊号', 'left'),
        cell: ({ row }) => row.getValue('visitId'),
      },
      {
        accessorKey: 'doctorName',
        header: ({ column }) => getHeader(column, '医生', 'left'),
        cell: ({ row }) => row.getValue('doctorName'),
      },
      {
        accessorKey: 'patientName',
        header: ({ column }) => getHeader(column, '患者', 'left'),
        cell: ({ row }) => row.getValue('patientName'),
      },
      {
        accessorKey: 'caseType',
        header: ({ column }) => getHeader(column, '病例类型', 'left'),
        cell: ({ row }) => row.getValue('caseType'),
      },
      {
        accessorKey: 'productName',
        header: ({ column }) => getHeader(column, '产品名称', 'left'),
        cell: ({ row }) => row.getValue('productName'),
      },
      {
        accessorKey: 'toothPosition',
        header: ({ column }) => getHeader(column, '牙位', 'left'),
        cell: ({ row }) => row.getValue('toothPosition'),
      },
      {
        accessorKey: 'unitPrice',
        header: ({ column }) => getHeader(column, '单价 (AUD)', 'left'),
        cell: ({ row }) => row.getValue('unitPrice'),
      },
      {
        accessorKey: 'quantity',
        header: ({ column }) => getHeader(column, '数量', 'left'),
        cell: ({ row }) => row.getValue('quantity'),
      },
      {
        accessorKey: 'subtotal',
        header: ({ column }) => getHeader(column, '小计 (AUD)', 'left'),
        cell: ({ row }) => row.getValue('subtotal'),
      },
      {
        accessorKey: 'totalAmount',
        header: ({ column }) => getHeader(column, '金额合计', 'left'),
        cell: ({ row }) => row.getValue('totalAmount'),
      },
      {
        accessorKey: 'chargeStatus',
        header: ({ column }) => getHeader(column, '扣费状态', 'left'),
        cell: ({ row }) => {
          const color = chargeStatusColorMap[row.getValue('chargeStatus') as 'success']
          return (
            <UBadge class="capitalize" variant="subtle" color={color as 'success'}>
              {row.getValue('chargeStatus')}
            </UBadge>
          )
        },
      },
      {
        accessorKey: 'remarks',
        header: ({ column }) => getHeader(column, '备注', 'right'),
        cell: ({ row }) => row.getValue('remarks'),
      },
    ]

    function getHeader(column: Column<Bill>, label: string, position: 'left' | 'right') {
      const isPinned = column.getIsPinned()

      return (
        <UButton
          size='sm'
          color="neutral"
          variant="ghost"
          label={label}
          icon={isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin'}
          class="-mx-2.5"
          onClick={() => {
            column.pin(isPinned === position ? false : position)
          }}
        ></UButton>
      )
    }

    return () => (
      <div class="space-y-6">
        {/* Account Balance Section */}
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-muted-foreground">充值余额 (AUD)</p>
                  <p class="text-3xl font-bold text-primary">2768.00</p>
                </div>
                <div class="text-sm text-muted-foreground">1 澳元 = 4.6841 人民币</div>
              </div>
            </div>
            <UButton color="primary" icon="i-heroicons-credit-card">
              联系客服充值
            </UButton>
          </div>
        </UCard>

        {/* Filters Section */}
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">账单时间</label>
              <UInput v-model={filters.billTime} placeholder="账单时间" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">患者姓名</label>
              <UInput v-model={filters.patientName} placeholder="患者姓名" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">就诊号</label>
              <UInput v-model={filters.visitId} placeholder="就诊号" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">产品名称</label>
              <UInput v-model={filters.productName} placeholder="产品名称" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">扣费状态</label>
              <USelect v-model={filters.chargeStatus} items={chargeStatusOptions} />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">医生姓名</label>
              <UInput v-model={filters.doctorName} placeholder="医生姓名" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">金额合计</label>
              <UInput v-model={filters.totalAmount} placeholder="金额合计" />
            </div>
          </div>
          <div class="flex gap-2 justify-end">
            <UButton color="primary" icon="i-heroicons-magnifying-glass">
              查询
            </UButton>
            <UButton variant="outline" icon="i-heroicons-arrow-path">
              重置
            </UButton>
          </div>
        </div>

        {/* Bills Table Section */}
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">账单明细</h3>
            <div class="flex gap-2">
              <UButton variant="outline" icon="i-heroicons-arrow-down-tray">
                导出报表
              </UButton>
            </div>
          </div>

          <div>
            <UTable
              columnPinning={columnPinning.value}
              columns={columns}
              data={bills.value}
              class="flex-1"
            />
          </div>

          <div class="flex justify-between items-center">
            <p class="text-sm text-muted-foreground">
              显示 1-{bills.value.length}, 共 {bills.value.length} 条数据
            </p>
            <UPagination total={100} sibling-count={1} show-edges />
          </div>
        </div>
      </div>
    )
  },
})

export type Bill = {
  id: number
  billTime: string
  visitId: string
  doctorName: string
  patientName: string
  caseType: string
  productName: string
  toothPosition: string
  unitPrice: number
  quantity: number
  subtotal: number
  totalAmount: number
  chargeStatus: string
  remarks: string
}
