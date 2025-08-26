import { defineComponent, reactive } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import UTable, { type TableColumn } from '@nuxt/ui/components/Table.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UPagination from '@nuxt/ui/components/Pagination.vue'

export default defineComponent({
  name: 'ProductsComponent',
  setup() {
    const filters = reactive({
      type: '全部',
      material: '全部',
      status: '全部',
    })

    const typeOptions = ['全部', '冠', '嵌体', '贴面', '桥']
    const materialOptions = ['全部', '玻璃陶瓷', '氧化锆', '金属烤瓷']
    const statusOptions = ['全部', '在用', '停用']

    const products: Product[] = [
      {
        id: 1,
        type: '冠',
        typeEn: 'CROWN',
        material: '玻璃陶瓷',
        materialEn: 'Emax Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 2,
        type: '冠',
        typeEn: 'CROWN',
        material: '氧化锆',
        materialEn: 'Zirconia Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '禁用',
      },
      {
        id: 3,
        type: '冠',
        typeEn: 'CROWN',
        material: '金属烤瓷',
        materialEn: 'PFM',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 4,
        type: '嵌体',
        typeEn: 'ONLAY',
        material: '玻璃陶瓷',
        materialEn: 'Emax Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 5,
        type: '嵌体',
        typeEn: 'ONLAY',
        material: '氧化锆',
        materialEn: 'Zirconia Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 6,
        type: '嵌体',
        typeEn: 'ONLAY',
        material: '金属烤瓷',
        materialEn: 'PFM',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 7,
        type: '贴面',
        typeEn: 'VENEER',
        material: '玻璃陶瓷',
        materialEn: 'Emax Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 8,
        type: '贴面',
        typeEn: 'VENEER',
        material: '氧化锆',
        materialEn: 'Zirconia Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 9,
        type: '贴面',
        typeEn: 'VENEER',
        material: '金属烤瓷',
        materialEn: 'PFM',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
      {
        id: 10,
        type: '桥',
        typeEn: 'BRIDGE',
        material: '玻璃陶瓷',
        materialEn: 'Emax Monolithic',
        unitPrice: 0,
        unit: '按牙位',
        calculationMethod: '按牙位',
        status: '在用',
      },
    ]

    const handleEditProduct = (product: Product) => {
      console.log('编辑产品:', product)
    }

    const handleAddProduct = () => {
      console.log('新增产品')
    }

    const handleQuery = () => {
      console.log('查询:', filters)
    }

    const handleReset = () => {
      filters.type = '全部'
      filters.material = '全部'
      filters.status = '全部'
    }

    const columns: TableColumn<Product>[] = [
      {
        accessorKey: 'type',
        header: '类型',
        cell: ({ row }) => row.original.type,
      },
      {
        accessorKey: 'typeEn',
        header: '类型英文',
        cell: ({ row }) => (
          <span class="font-mono text-muted-foreground">{row.original.typeEn}</span>
        ),
      },
      {
        accessorKey: 'material',
        header: '材料',
        cell: ({ row }) => row.original.material,
      },
      {
        accessorKey: 'materialEn',
        header: '材料英文',
        cell: ({ row }) => (
          <span class="font-mono text-muted-foreground">{row.original.materialEn}</span>
        ),
      },
      {
        accessorKey: 'unitPrice',
        header: '单价',
        cell: ({ row }) => row.original.unitPrice,
      },
      {
        accessorKey: 'unit',
        header: '单位',
        cell: ({ row }) => row.original.unit,
      },
      {
        accessorKey: 'calculationMethod',
        header: '计算方式',
        cell: ({ row }) => row.original.calculationMethod,
      },
      {
        accessorKey: 'status',
        header: '状态',
        cell: ({ row }) => (
          <UBadge
            leadingIcon={row.original.status === '在用' ? 'i-lucide-circle-check' : 'i-lucide-x'}
            size="md"
            color={row.original.status === '在用' ? 'success' : 'error'}
            variant="soft"
          >
            {row.original.status}
          </UBadge>
          // <div class="flex items-center gap-2">
          //   <div
          //     class={`w-2 h-2 rounded-full ${row.original.status === '在用' ? 'bg-primary' : 'bg-warning'}`}
          //   />
          //   <span class={row.original.status === '在用' ? 'text-primary' : 'text-muted-foreground'}>
          //     {row.original.status}
          //   </span>
          // </div>
        ),
      },
      {
        header: '操作',
        cell: ({ row }) => (
          <UButton
            size="sm"
            variant="outline"
            color="primary"
            icon="i-lucide-pen"
            onClick={() => handleEditProduct(row.original)}
          >
            编辑
          </UButton>
        ),
      },
    ]

    return () => (
      <div>
        {/* Filters */}
        <div class="mb-6">
          <div class="flex items-end gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm text-muted-foreground">类型</label>
              <USelect v-model={filters.type} items={typeOptions} class="w-48" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm text-muted-foreground">材料</label>
              <USelect v-model={filters.material} items={materialOptions} class="w-48" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm text-muted-foreground">状态</label>
              <USelect v-model={filters.status} items={statusOptions} class="w-48" />
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

        {/* Add Product Button */}
        <div class="mb-4">
          <UButton icon="i-heroicons-plus-circle-solid" color="primary" to="/admin/products/create">
            新增产品
          </UButton>
        </div>

        {/* Table */}
        <div>
          <UTable data={products} columns={columns} />

          <div class="flex justify-between items-center mt-4">
            <p class="text-sm text-muted-foreground">
              显示 1-{products.length}, 共 {products.length} 条数据
            </p>
            <UPagination total={100} sibling-count={1} show-edges />
          </div>
        </div>
      </div>
    )
  },
})

export type Product = {
  id: number
  type: string
  typeEn: string
  material: string
  materialEn: string
  unitPrice: number
  unit: string
  calculationMethod: string
  status: string
}
