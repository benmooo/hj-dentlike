import { defineComponent, type PropType } from 'vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
import { type CreateOrder, type Product } from '../../../views/client/order/create-order/types' // Assuming types.ts is in the same directory

export default defineComponent({
  name: 'OrderInspector',
  props: {
    order: {
      type: Object as PropType<Partial<CreateOrder>>,
      required: true,
    },
  },
  setup(props) {
    const renderField = (label: string, value?: string | number | string[]) => {
      if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
        return null // Don't render if value is not provided
      }
      return (
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-xs">
          <span class="text-dimmed min-w-[70px]">{label}:</span>
          <span class="font-medium text-muted flex-1">
            {Array.isArray(value) ? value.join(', ') : value}
          </span>
        </div>
      )
    }

    const renderProduct = (product: Product, index: number) => (
      <div key={index} class="space-y-2 pb-4">
        {index > 0 && <UDivider class="my-4" />} {/* Divider between multiple products */}
        <h3 class="text-xs font-semibold text-muted">
          产品信息 {props.order.products && props.order.products.length > 1 ? `(${index + 1})` : ''}
        </h3>
        {renderField('修复类型', product.restorationType)}
        {product.toothPosition && (
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span class="min-w-[70px] text-xs text-muted">牙位:</span>
            <div class="border border-muted w-10 h-10 flex items-center justify-center relative font-medium ">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-full h-px"></div>
                <div class="h-full w-px absolute"></div>
              </div>
              {product.toothPosition.join(',')}
            </div>
          </div>
        )}
        {renderField('项目类型', product.itemType)}
        {renderField('材料', product.material)}
        {renderField('牙色', product.toothColor)}
        {renderField('染色', product.stain)}
        {renderField('咬合空间', product.occlusalSpace)}
        {renderField('冠的类型', product.crownType)}
      </div>
    )

    return () => (
      <div class="max-h-[calc(100vh-150px)] flex flex-col overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">订单信息</h2>

        {/* Basic Information Section */}
        <div class="mb-6 space-y-2">
          <h3 class="text-xs font-semibold text-muted">基本信息</h3>
          {renderField('牙医姓名', props.order.dentistName)}
          {renderField('诊所名称', props.order.clinicName)}
          {renderField('电话', props.order.phone)}
          {renderField('邮箱', props.order.email)}
          {renderField('日期', props.order.date)}
          {renderField('戴牙日期', props.order.dueDate)} {/* Consistent with create-order.tsx */}
          {renderField('患者姓名', props.order.patientName)}
          {renderField(
            '性别',
            props.order.gender === 'male'
              ? '男'
              : props.order.gender === 'female'
                ? '女'
                : props.order.gender,
          )}
          {renderField('患者年龄', props.order.patientAge)}
          {renderField('订单号', props.order.orderId)}
          {renderField('取模方式', props.order.impressionMethod)}
          {renderField('订单属性', props.order.orderProperty)}
        </div>

        {/* Product Information Section */}
        {props.order.products && props.order.products.length > 0 ? (
          <div class="mb-6">{props.order.products.map(renderProduct)}</div>
        ) : (
          <div class="mb-6 text-dimmed">暂无产品信息</div>
        )}

        {/* Attachments and Special Requirements Section */}
        <div class="mt-auto space-y-2">
          {' '}
          <h3 class="text-xs font-semibold text-muted">其他信息</h3>
          {/* mt-auto pushes this section to the bottom */}
          {renderField('附件上传', props.order.attachments?.length ? '已上传' : '未上传')}
          {renderField('特别要求', props.order.specialRequirements)}
        </div>

        {!props.order.dentistName &&
          !props.order.patientName &&
          (!props.order.products || props.order.products.length === 0) && (
            <div class="flex-grow flex items-center justify-center">
              <span class="text-dimmed text-lg">暂无订单信息</span>
            </div>
          )}
      </div>
    )
  },
})
