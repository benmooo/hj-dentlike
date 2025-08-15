import { defineComponent, ref } from 'vue'

import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import URadio from '@nuxt/ui/components/RadioGroup.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
// import UIcon from '@nuxt/ui/components/Icon.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'

// Mathematical model for dental chart positioning
const DENTAL_CHART_CONFIG = {
  upperTeeth: Array.from({ length: 8 }, (_, i) => ({ id: 8 - i, position: i })),
  lowerTeeth: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, position: i })),
  selectedTooth: 3,
  spacing: 'gap-1',
  toothSize: 'w-12 h-16',
}

const ToothComponent = defineComponent({
  props: {
    toothNumber: { type: Number, required: true },
    isSelected: { type: Boolean, default: false },
    isUpper: { type: Boolean, default: true },
    toothSize: { type: String, default: 'w-12 h-16' },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col items-center">
        <div
          class={[
            'relative flex flex-col items-center justify-center rounded-lg transition-all duration-200',
            props.toothSize,
            props.isSelected
              ? 'bg-primary text-primary-foreground shadow-lg scale-105'
              : 'bg-muted hover:bg-muted/80',
          ]}
        >
          {/* Tooth crown representation */}
          <div
            class={[
              'rounded-t-full border-2',
              props.isUpper ? 'w-8 h-8 mb-1' : 'w-8 h-8 mt-1',
              props.isSelected
                ? 'border-primary-foreground bg-primary-foreground/20'
                : 'border-border',
            ]}
          />

          {/* Tooth root representation */}
          <div
            class={[
              'border-2 border-t-0',
              props.isUpper ? 'w-4 h-6 rounded-b-sm' : 'w-4 h-6 rounded-t-sm',
              props.isSelected
                ? 'border-primary-foreground bg-primary-foreground/20'
                : 'border-border',
            ]}
          />
        </div>

        {/* Tooth number */}
        <UBadge
          color={props.isSelected ? 'primary' : 'secondary'}
          variant="soft"
          size="xs"
          class="mt-1"
        >
          {props.toothNumber}
        </UBadge>
      </div>
    )
  },
})

const DentalChart = defineComponent({
  setup() {
    return () => (
      <UCard class="p-6">
        <div class="space-y-4">
          <div class="text-center">
            <h3 class="text-lg font-semibold mb-4">修复类型：固定修复</h3>
          </div>

          {/* Upper teeth row */}
          <div class="flex justify-center">
            <div class={`flex ${DENTAL_CHART_CONFIG.spacing} mb-2`}>
              {DENTAL_CHART_CONFIG.upperTeeth.map((tooth) => (
                <ToothComponent
                  key={`upper-${tooth.id}`}
                  toothNumber={tooth.id}
                  isSelected={tooth.id === DENTAL_CHART_CONFIG.selectedTooth}
                  isUpper={true}
                />
              ))}
              <div class="mx-4 w-px bg-border" />
              {DENTAL_CHART_CONFIG.upperTeeth.map((tooth) => (
                <ToothComponent
                  key={`upper-right-${tooth.position + 1}`}
                  toothNumber={tooth.position + 1}
                  isSelected={false}
                  isUpper={true}
                />
              ))}
            </div>
          </div>

          {/* Gum line separator */}
          <div class="flex justify-center">
            <div class="w-full max-w-2xl border-t-2 border-dashed border-muted-foreground/30" />
          </div>

          {/* Lower teeth row */}
          <div class="flex justify-center">
            <div class={`flex ${DENTAL_CHART_CONFIG.spacing} mt-2`}>
              {DENTAL_CHART_CONFIG.lowerTeeth.map((tooth) => (
                <ToothComponent
                  key={`lower-${tooth.id}`}
                  toothNumber={tooth.id}
                  isSelected={false}
                  isUpper={false}
                />
              ))}
              <div class="mx-4 w-px bg-border" />
              {DENTAL_CHART_CONFIG.lowerTeeth.map((tooth) => (
                <ToothComponent
                  key={`lower-right-${8 - tooth.position}`}
                  toothNumber={8 - tooth.position}
                  isSelected={false}
                  isUpper={false}
                />
              ))}
            </div>
          </div>
        </div>
      </UCard>
    )
  },
})

const InfoSection = defineComponent({
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
  },
  setup(props) {
    return () => (
      <UCard class="h-full">
        {{
          header: () => <h3 class="text-lg font-semibold text-foreground">{props.title}</h3>,
          default: () => (
            <div class="space-y-3">
              {props.items.map((item: any, index: number) => (
                <div key={index} class="flex flex-col space-y-1">
                  <dt class="text-sm font-medium text-muted-foreground">{item.label}</dt>
                  <dd
                    class={[
                      'text-sm',
                      item.highlight ? 'font-semibold text-primary' : 'text-foreground',
                    ]}
                  >
                    {item.badge ? (
                      <UBadge color={item.badge.color} variant={item.badge.variant}>
                        {item.value}
                      </UBadge>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </div>
          ),
        }}
      </UCard>
    )
  },
})

const SpecificationGrid = defineComponent({
  setup() {
    const specifications = [
      { label: '项目类型', value: '嵌体' },
      { label: '牙色', value: '2L1.5' },
      { label: '如果咬合空间不够(习惯)', value: '调备牙' },
      { label: '材料', value: '玻璃陶瓷' },
      { label: '染色', value: '不要染色' },
      { label: '冠的类型', value: '' },
      { label: '咬合关系', value: '正常' },
    ]

    return () => (
      <UCard>
        {{
          header: () => (
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">技术规格</h3>
              <UBadge color="primary" variant="soft" icon="i-heroicons-document-arrow-down">
                技术规格
              </UBadge>
            </div>
          ),
          default: () => (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} class="space-y-1">
                  <dt class="text-sm font-medium text-muted-foreground">{spec.label}</dt>
                  <dd class="text-sm text-foreground font-medium">
                    {spec.value || <span class="text-muted-foreground italic">未指定</span>}
                  </dd>
                </div>
              ))}
            </div>
          ),
        }}
      </UCard>
    )
  },
})

const AttachmentsSection = defineComponent({
  setup() {
    const attachments = ref([
      { name: 'scan_file_001.stl', size: '2.4 MB', type: 'STL文件' },
      { name: 'impression_photos.zip', size: '15.2 MB', type: '照片文件' },
    ])

    return () => (
      <UCard>
        {{
          header: () => (
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">电子附件</h3>
              <UBadge color="primary" variant="soft">
                {attachments.value.length} 个文件
              </UBadge>
            </div>
          ),
          default: () => (
            <div class="space-y-3">
              {attachments.value.map((file, index) => (
                <div
                  key={index}
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <UButton
                      icon="i-heroicons-document-arrow-down"
                      variant="link"
                      size="xs"
                    ></UButton>
                    <div>
                      <p class="text-sm font-medium text-foreground">{file.name}</p>
                      <p class="text-xs text-muted-foreground">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="primary"
                    icon="i-heroicons-arrow-down-tray"
                  >
                    下载
                  </UButton>
                </div>
              ))}
            </div>
          ),
        }}
      </UCard>
    )
  },
})

const SpecialRequirements = defineComponent({
  setup() {
    const requirements = ref('')

    return () => (
      <UCard>
        {{
          header: () => <h3 class="text-lg font-semibold">特别要求</h3>,
          default: () => (
            <div class="space-y-4">
              <UTextarea
                v-model={requirements.value}
                placeholder="请输入特殊要求或备注..."
                rows={4}
                class="resize-none w-full"
              />

              {!requirements.value && (
                <div class="text-center py-8">
                  <UButton
                    icon="i-heroicons-chat-bubble-left-ellipsis"
                    variant="link"
                    size="xs"
                  ></UButton>
                  <p class="text-sm text-muted-foreground">暂无特别要求</p>
                </div>
              )}
            </div>
          ),
        }}
      </UCard>
    )
  },
})

export default defineComponent({
  name: 'OrderDetail',
  setup() {
    // Mathematical layout proportions: Golden ratio for optimal visual balance
    const LAYOUT_PROPORTIONS = {
      headerRatio: 0.1,
      contentRatio: 0.9,
      sidebarRatio: 0.38,
      mainRatio: 0.62,
    }

    const dentistInfo = [
      { label: '牙医姓名', value: '王君雨' },
      { label: '诊所名称', value: '澳洲牙牙乐口腔门诊' },
      { label: '电话', value: '+61 412 345 6 78' },
      { label: '邮箱', value: 'aozhou@gionline.com.au' },
      { label: '日期', value: '2025-07-05' },
      { label: '截牙时间', value: '2025-07-20 上午' },
    ]

    const patientInfo = [
      { label: '患者姓名', value: '约翰', highlight: true },
      { label: '性别', value: '男' },
      { label: '患者年龄', value: '56' },
      { label: '订单号', value: '202507090001', highlight: true },
      { label: '取模方式', value: '口扫件' },
      {
        label: '订单属性',
        value: '加急',
        badge: { color: 'red', variant: 'soft' },
      },
    ]

    return () => (
      <div class="min-h-screen bg-background">
        {/* Header */}
        <div class="bg-card">
          <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <UButton
                  variant="ghost"
                  size="sm"
                  to="/client/orders"
                  icon="i-heroicons-arrow-left"
                >
                  返回订单列表
                </UButton>
                <div class="h-6 w-px bg-border" />
                <h1 class="text-2xl font-bold text-foreground">订单详情</h1>
              </div>

              <div class="flex items-center space-x-2">
                <UBadge color="primary" variant="soft" icon="i-heroicons-check-circle">
                  已确认
                </UBadge>
                <UButton color="primary" size="sm" icon="i-heroicons-pencil-square">
                  编辑订单
                </UButton>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="container mx-auto px-4 py-8">
          <div class="space-y-8">
            {/* Basic Information Grid */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InfoSection title="医生信息" items={dentistInfo} />
              <InfoSection title="患者信息" items={patientInfo} />
            </div>

            {/* Dental Chart */}
            <DentalChart />

            {/* Technical Specifications */}
            <SpecificationGrid />

            {/* Bottom Grid */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttachmentsSection />
              <SpecialRequirements />
            </div>

            {/* Action Buttons */}
            <div class="flex justify-end space-x-4 pt-6">
              <UButton variant="outline" size="lg" icon="i-heroicons-printer">
                打印订单
              </UButton>
              <UButton variant="outline" size="lg" icon="i-heroicons-share">
                分享订单
              </UButton>
              <UButton color="primary" size="lg" icon="i-heroicons-cog-6-tooth">
                处理订单
              </UButton>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
