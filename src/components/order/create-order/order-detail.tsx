import { defineComponent, type PropType } from 'vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
// import UIcon from '@nuxt/ui/components/Icon.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import { type CreateOrder, type Product } from '../../../views/client/order/create-order/types'

export default defineComponent({
  name: 'OrderDetail',
  props: {
    order: {
      type: Object as PropType<CreateOrder>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit', 'save', 'edit'],
  setup(props, { emit }) {
    const formatGender = (gender?: string) => {
      if (!gender) return ''
      return gender === 'male' ? '男' : gender === 'female' ? '女' : gender
    }

    const formatOrderProperty = (property?: string) => {
      if (!property) return ''
      switch (property) {
        case 'urgent':
          return '加急'
        case 'rework':
          return '返工'
        default:
          return property
      }
    }

    const formatImpressionMethod = (method?: string) => {
      if (!method) return ''
      return method === 'oralScan' ? '口扫件' : method === 'plasterModel' ? '石膏模型' : method
    }

    const getOrderPropertyColor = (property?: string) => {
      switch (property) {
        case 'urgent':
          return 'red'
        case 'rework':
          return 'orange'
        default:
          return 'gray'
      }
    }

    const renderInfoItem = (label: string, value?: string | number, icon?: string) => {
      if (!value) return null

      return (
        <div class="flex items-center gap-3 py-2">
          {icon && (
            <div class="flex-shrink-0">
              <UButton variant="link" icon={icon} class="w-4 h-4" />
            </div>
          )}
          <div class="min-w-0 flex-1">
            <div class="text-sm text-muted">{label}</div>
            <div class="text-base font-medium truncate">{value}</div>
          </div>
        </div>
      )
    }

    const renderToothDiagram = (toothPosition?: number[]) => {
      if (!toothPosition || toothPosition.length === 0) return null

      // Create a simplified tooth diagram grid
      const maxTeeth = 32
      const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1)
      const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17)

      return (
        <div class="space-y-4">
          <div class="text-sm text-muted">牙位图示</div>
          <div class="p-4 rounded-lg">
            {/* Upper teeth */}
            <div class="grid grid-cols-8 gap-1 mb-4">
              {upperTeeth.map((tooth) => (
                <div
                  key={tooth}
                  class={`
                    w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-medium
                    ${toothPosition.includes(tooth) ? 'border-primary' : 'border-gray-300'}
                  `}
                >
                  {tooth}
                </div>
              ))}
            </div>
            {/* Lower teeth */}
            <div class="grid grid-cols-8 gap-1">
              {lowerTeeth.map((tooth) => (
                <div
                  key={tooth}
                  class={`
                    w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-medium
                    ${toothPosition.includes(tooth) ? 'border-primary' : 'border-gray-300'}
                  `}
                >
                  {tooth}
                </div>
              ))}
            </div>
          </div>
          <div class="text-xs text-muted">已选择牙位: {toothPosition.join(', ')}</div>
        </div>
      )
    }

    const renderProduct = (product: Product, index: number) => (
      <UCard key={index} class="mb-4">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">
              产品信息{' '}
              {props.order.products && props.order.products.length > 1 ? `#${index + 1}` : ''}
            </h4>
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-pencil"
              onClick={() => emit('edit', 'product', index)}
            >
              编辑
            </UButton>
          </div>

          {product.toothPosition && renderToothDiagram(product.toothPosition)}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInfoItem('修复类型', product.restorationType, 'i-heroicons-cog-6-tooth')}
            {renderInfoItem('项目类型', product.itemType, 'i-heroicons-cube')}
            {renderInfoItem('材料', product.material, 'i-heroicons-beaker')}
            {renderInfoItem('牙色', product.toothColor, 'i-heroicons-color-swatch')}
            {renderInfoItem('染色', product.stain, 'i-heroicons-paint-brush')}
            {renderInfoItem('咬合空间', product.occlusalSpace, 'i-heroicons-arrows-pointing-in')}
            {renderInfoItem('冠的类型', product.crownType, 'i-heroicons-identification')}
          </div>
        </div>
      </UCard>
    )

    return () => (
      <div class="space-y-6">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">订单详情</h1>
            <p class="text-muted mt-1">请仔细核对订单信息后提交</p>
          </div>
          <div class="flex items-center gap-2">
            {props.order.orderProperty && (
              <UBadge
                // color={getOrderPropertyColor(props.order.orderProperty)}
                variant="subtle"
                size="lg"
              >
                {formatOrderProperty(props.order.orderProperty)}
              </UBadge>
            )}
            <UButton
              variant="ghost"
              icon="i-heroicons-pencil"
              onClick={() => emit('edit', 'basic')}
            >
              编辑
            </UButton>
          </div>
        </div>

        {/* Basic Information Card */}
        <UCard>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <UAvatar
                size="sm"
                icon="i-heroicons-user-circle"
                alt={props.order.dentistName || '牙医'}
              />
              <h3 class="text-xl font-semibold">基本信息</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {renderInfoItem('牙医姓名', props.order.dentistName, 'i-heroicons-user')}
              {renderInfoItem('诊所名称', props.order.clinicName, 'i-heroicons-building-office')}
              {renderInfoItem('联系电话', props.order.phone, 'i-heroicons-phone')}
              {renderInfoItem('邮箱地址', props.order.email, 'i-heroicons-envelope')}
              {renderInfoItem('订单日期', props.order.date, 'i-heroicons-calendar-days')}
              {renderInfoItem('戴牙日期', props.order.dueDate, 'i-heroicons-clock')}
              {renderInfoItem('患者姓名', props.order.patientName, 'i-heroicons-user-circle')}
              {renderInfoItem(
                '性别',
                formatGender(props.order.gender),
                'i-heroicons-identification',
              )}
              {renderInfoItem('患者年龄', props.order.patientAge, 'i-heroicons-calendar')}
              {renderInfoItem('订单号', props.order.orderId, 'i-heroicons-hashtag')}
              {renderInfoItem(
                '取模方式',
                formatImpressionMethod(props.order.impressionMethod),
                'i-heroicons-cube-transparent',
              )}
            </div>
          </div>
        </UCard>

        {/* Product Information Cards */}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold">产品信息</h3>
            <UButton
              variant="ghost"
              icon="i-heroicons-plus"
              onClick={() => emit('edit', 'product', 'add')}
            >
              添加产品
            </UButton>
          </div>

          {props.order.products && props.order.products.length > 0 ? (
            props.order.products.map(renderProduct)
          ) : (
            <UCard>
              <div class="text-center py-8">
                <UButton
                  icon="i-heroicons-cube"
                  variant="link"
                  class="w-12 h-12 text-muted mx-auto mb-4"
                />
                <p class="text-muted">暂无产品信息</p>
                <UButton class="mt-4" onClick={() => emit('edit', 'product', 'add')}>
                  添加产品
                </UButton>
              </div>
            </UCard>
          )}
        </div>

        {/* Additional Information Card */}
        <UCard>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">其他信息</h3>
              <UButton
                variant="ghost"
                icon="i-heroicons-pencil"
                onClick={() => emit('edit', 'additional')}
                size='sm'
              >
                编辑
              </UButton>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div class="flex items-center gap-3 py-2">
                <div class="flex-shrink-0">
                  <UButton
                    variant="link"
                    icon="i-heroicons-paper-clip"
                    class="w-4 h-4 text-muted "
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-sm text-muted">附件上传</div>
                  <div class="flex items-center gap-2">
                    <div class="text-base font-medium text-muted">
                      {props.order.attachments?.length
                        ? `已上传 ${props.order.attachments.length} 个文件`
                        : '未上传'}
                    </div>
                    {props.order.attachments?.length && (
                      <UBadge color="primary" variant="subtle">
                        {props.order.attachments.length}
                      </UBadge>
                    )}
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3 py-2">
                <div class="flex-shrink-0 pt-1">
                  <UButton
                    variant="link"
                    icon="i-heroicons-chat-bubble-left-ellipsis"
                    class="w-4 h-4 text-muted"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-sm text-muted">特别要求</div>
                  <div class="text-base font-medium">
                    {props.order.specialRequirements || '无特别要求'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        {/* Action Buttons */}
        <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <UButton
            size="lg"
            loading={props.loading}
            onClick={() => emit('submit')}
            class="flex-1 sm:flex-none sm:min-w-[200px]"
            icon="i-heroicons-paper-airplane"
          >
            提交订单
          </UButton>

          <UButton
            variant="outline"
            size="lg"
            onClick={() => emit('save')}
            class="flex-1 sm:flex-none sm:min-w-[120px]"
            icon="i-heroicons-bookmark"
          >
            暂存
          </UButton>

          <div class="flex-1"></div>

          <UButton
            variant="ghost"
            size="lg"
            onClick={() => emit('edit', 'back')}
            class="sm:min-w-[120px]"
            icon="i-heroicons-arrow-left"
          >
            返回编辑
          </UButton>
        </div>

        {/* Order Summary Footer */}
        {(props.order.dentistName ||
          props.order.patientName ||
          (props.order.products && props.order.products.length > 0)) && (
          <div class="rounded-lg p-4 mt-6">
            <div class="text-sm space-y-1">
              <p>
                <span class="font-medium">订单摘要:</span>
                {props.order.dentistName && ` 牙医 ${props.order.dentistName}`}
                {props.order.patientName && ` 为患者 ${props.order.patientName}`}
                {props.order.products?.length && ` 制作 ${props.order.products.length} 个产品`}
              </p>
              {props.order.dueDate && (
                <p>
                  <span class="font-medium">预计完成:</span> {props.order.dueDate}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
})
