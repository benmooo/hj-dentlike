import { defineComponent, type PropType, ref } from 'vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UDivider from '@nuxt/ui/components/Separator.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import UModal from '@nuxt/ui/components/Modal.vue'

interface OrderTranslationData {
  appointmentNumber: string
  doctorName: string
  patientName: string
  clinicName: string
  gender: 'M' | 'F'
  age: number
  phone: string
  dueDate: string
  address: string
  designDetails: {
    toothPosition: string
    productName: string
    quantity: number
    toothColor: string
  }[]
  designRequirements: string
  orderNote: string
}

export default defineComponent({
  name: 'OrderTranslation',
  props: {
    orderData: {
      type: Object as PropType<OrderTranslationData>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['translate', 'cancel', 'submit'],
  setup(props, { emit }) {
    const translationNote = ref('')
    const showTranslationModal = ref(false)

    // Translation mappings
    const translations = {
      gender: {
        M: '男',
        F: '女',
      },
      labels: {
        appointmentNumber: '就诊号',
        doctorName: '牙医姓名',
        patientName: '患者姓名',
        clinicName: '诊所名称',
        gender: '性别',
        age: '患者年龄',
        phone: '手机号码',
        dueDate: '戴牙日期',
        address: '诊所地址',
        designDetails: '设计详情',
        toothPosition: '牙位',
        productName: '产品名称',
        quantity: '数量',
        toothColor: '牙色',
        designRequirements: '设计要求',
        orderNote: '订单备注',
      },
    }

    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toLocaleDateString('zh-CN')
      } catch {
        return dateString
      }
    }

    const renderToothDiagram = () => {
      return (
        <div class="flex justify-center">
          <div class="w-24 h-32 border border-muted rounded-lg relative">
            {/* Simple tooth outline */}
            <svg viewBox="0 0 100 140" class="w-full h-full">
              <path
                d="M20 20 Q50 10, 80 20 Q85 30, 80 50 L75 100 Q50 120, 25 100 L20 50 Q15 30, 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-dasharray="5,5"
                class="text-muted"
              />
            </svg>
          </div>
        </div>
      )
    }

    const renderInfoRow = (
      labelKey: keyof typeof translations.labels,
      value: string | number,
      chineseValue?: string,
    ) => (
      <div class="grid grid-cols-2 gap-8 py-3 border-b border-muted last:border-b-0">
        <div class="space-y-1">
          <div class="text-sm font-medium">
            {labelKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </div>
          <div class="text-base">{value}</div>
        </div>
        <div class="space-y-1">
          <div class="text-sm font-medium">{translations.labels[labelKey]}</div>
          <div class="text-base">{chineseValue || value}</div>
        </div>
      </div>
    )

    const renderDesignDetailsTable = () => (
      <div class="space-y-4">
        {/* English Table */}
        <div class="space-y-2">
          <h4 class="font-medium text-sm">Design Details:</h4>
          <div class="overflow-hidden rounded-lg border border-muted">
            <table class="w-full text-sm">
              <thead class="bg-muted/20">
                <tr>
                  <th class="px-3 py-2 text-left">Tooth Position</th>
                  <th class="px-3 py-2 text-left">Product Name</th>
                  <th class="px-3 py-2 text-left">Quantity</th>
                  <th class="px-3 py-2 text-left">Tooth Color</th>
                </tr>
              </thead>
              <tbody>
                {props.orderData.designDetails.map((detail, index) => (
                  <tr key={index} class="border-t border-muted">
                    <td class="px-3 py-2">{detail.toothPosition}</td>
                    <td class="px-3 py-2">{detail.productName}</td>
                    <td class="px-3 py-2">{detail.quantity}</td>
                    <td class="px-3 py-2">{detail.toothColor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chinese Table */}
        <div class="space-y-2">
          <h4 class="font-medium text-sm">设计详情：</h4>
          <div class="overflow-hidden rounded-lg border border-muted">
            <table class="w-full text-sm">
              <thead class="bg-muted/20">
                <tr>
                  <th class="px-3 py-2 text-left">牙位</th>
                  <th class="px-3 py-2 text-left">产品名称</th>
                  <th class="px-3 py-2 text-left">数量</th>
                  <th class="px-3 py-2 text-left">牙色</th>
                </tr>
              </thead>
              <tbody>
                {props.orderData.designDetails.map((detail, index) => (
                  <tr key={index} class="border-t border-muted">
                    <td class="px-3 py-2">{detail.toothPosition}</td>
                    <td class="px-3 py-2">{detail.productName}</td>
                    <td class="px-3 py-2">{detail.quantity}</td>
                    <td class="px-3 py-2">{detail.toothColor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    return () => (
      <div class="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UAvatar icon="i-heroicons-language" size="sm" />
            <div>
              <h1 class="text-2xl font-bold">翻译审核</h1>
              <p class="text-muted text-sm">Translation Review</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UBadge variant="soft" color="primary">
              双语对照
            </UBadge>
          </div>
        </div>

        {/* Main Translation Cards */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* English Version */}
          <UCard class="h-fit">
            <div class="space-y-6">
              <div class="flex items-center justify-between border-b border-muted pb-4">
                <h2 class="text-xl font-semibold">Doctor's Prescription</h2>
                <div class="text-sm text-muted">{props.orderData.dueDate}</div>
              </div>

              {/* Basic Info - English */}
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">Appointment number:</span>
                    <div class="font-medium">{props.orderData.appointmentNumber}</div>
                  </div>
                  <div>
                    <span class="text-muted">Due Date:</span>
                    <div class="font-medium">{props.orderData.dueDate}</div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">Doctor's name:</span>
                    <div class="font-medium">{props.orderData.doctorName}</div>
                  </div>
                  <div>
                    <span class="text-muted">Patient:</span>
                    <div class="font-medium">{props.orderData.patientName}</div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">Clinic Name:</span>
                    <div class="font-medium">{props.orderData.clinicName}</div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <span class="text-muted">Gender:</span>
                      <div class="font-medium">{props.orderData.gender}</div>
                    </div>
                    <div>
                      <span class="text-muted">Age:</span>
                      <div class="font-medium">{props.orderData.age}</div>
                    </div>
                  </div>
                </div>

                <div class="text-sm">
                  <span class="text-muted">Phone:</span>
                  <div class="font-medium">{props.orderData.phone}</div>
                </div>

                <div class="text-sm">
                  <span class="text-muted">Address:</span>
                  <div class="font-medium">{props.orderData.address}</div>
                </div>
              </div>

              {/* Tooth Diagram */}
              <div class="space-y-2">
                <div class="text-sm font-medium">Ivory Colour:</div>
                {renderToothDiagram()}
              </div>

              {/* Design Requirements */}
              <div class="space-y-2">
                <div class="text-sm font-medium">Design Requirements:</div>
                <div class="text-sm p-3 bg-muted/20 rounded">
                  {props.orderData.designRequirements}
                </div>
              </div>

              {/* Order Note */}
              <div class="space-y-2">
                <div class="text-sm font-medium">Order Note:</div>
                <div class="text-sm p-3 bg-muted/20 rounded">{props.orderData.orderNote}</div>
              </div>
            </div>
          </UCard>

          {/* Chinese Version */}
          <UCard class="h-fit">
            <div class="space-y-6">
              <div class="flex items-center justify-between border-b border-muted pb-4">
                <h2 class="text-xl font-semibold">医生设计单</h2>
                <div class="text-sm text-muted">{formatDate(props.orderData.dueDate)}</div>
              </div>

              {/* Basic Info - Chinese */}
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">就诊号:</span>
                    <div class="font-medium">{props.orderData.appointmentNumber}</div>
                  </div>
                  <div>
                    <span class="text-muted">戴牙日期:</span>
                    <div class="font-medium">{formatDate(props.orderData.dueDate)}</div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">牙医姓名:</span>
                    <div class="font-medium">{props.orderData.doctorName}</div>
                  </div>
                  <div>
                    <span class="text-muted">患者姓名:</span>
                    <div class="font-medium">{props.orderData.patientName}</div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-muted">诊所名称:</span>
                    <div class="font-medium">{props.orderData.clinicName}</div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <span class="text-muted">性别:</span>
                      <div class="font-medium">{translations.gender[props.orderData.gender]}</div>
                    </div>
                    <div>
                      <span class="text-muted">患者年龄:</span>
                      <div class="font-medium">{props.orderData.age}</div>
                    </div>
                  </div>
                </div>

                <div class="text-sm">
                  <span class="text-muted">手机号码:</span>
                  <div class="font-medium">{props.orderData.phone}</div>
                </div>

                <div class="text-sm">
                  <span class="text-muted">诊所地址:</span>
                  <div class="font-medium">{props.orderData.address}</div>
                </div>
              </div>

              {/* Tooth Diagram */}
              <div class="space-y-2">
                <div class="text-sm font-medium">牙色:</div>
                {renderToothDiagram()}
              </div>

              {/* Design Requirements */}
              <div class="space-y-2">
                <div class="text-sm font-medium">设计要求:</div>
                <div class="text-sm p-3 bg-muted/20 rounded">
                  {props.orderData.designRequirements}
                </div>
              </div>

              {/* Order Note */}
              <div class="space-y-2">
                <div class="text-sm font-medium">订单备注:</div>
                <div class="text-sm p-3 bg-muted/20 rounded">{props.orderData.orderNote}</div>
              </div>
            </div>
          </UCard>
        </div>

        {/* Design Details Table */}
        <UCard>{renderDesignDetailsTable()}</UCard>

        {/* Translation Notes */}
        <UCard>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <UButton
                variant="link"
                icon="i-heroicons-chat-bubble-left-ellipsis"
                class="w-5 h-5"
              />
              翻译备注 / Translation Notes
            </h3>
            <UTextarea
              v-model={translationNote.value}
              placeholder="请添加翻译说明或备注... / Add translation notes or remarks..."
              rows={3}
            />
          </div>
        </UCard>

        {/* Action Buttons */}
        <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-muted">
          <UButton
            size="lg"
            loading={props.loading}
            onClick={() => emit('submit', translationNote.value)}
            class="flex-1 sm:flex-none sm:min-w-[160px]"
            icon="i-heroicons-check-circle"
          >
            确认翻译 / Confirm
          </UButton>

          <UButton
            variant="outline"
            size="lg"
            onClick={() => {
              showTranslationModal.value = true
            }}
            class="flex-1 sm:flex-none sm:min-w-[120px]"
            icon="i-heroicons-language"
          >
            重新翻译 / Retranslate
          </UButton>

          <div class="flex-1"></div>

          <UButton
            variant="ghost"
            size="lg"
            onClick={() => emit('cancel')}
            class="sm:min-w-[100px]"
            icon="i-heroicons-x-mark"
          >
            取消 / Cancel
          </UButton>
        </div>

        {/* Translation Modal */}
        <UModal v-model={showTranslationModal.value}>
          <UCard>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">重新翻译确认</h3>
              <p class="text-muted">您确定要重新翻译此订单吗？这将覆盖当前的翻译内容。</p>
              <div class="flex justify-end gap-3">
                <UButton
                  variant="ghost"
                  onClick={() => {
                    showTranslationModal.value = false
                  }}
                >
                  取消
                </UButton>
                <UButton
                  color="primary"
                  onClick={() => {
                    showTranslationModal.value = false
                    emit('translate')
                  }}
                >
                  确认重新翻译
                </UButton>
              </div>
            </div>
          </UCard>
        </UModal>
      </div>
    )
  },
})
