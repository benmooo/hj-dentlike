import { defineComponent, ref, reactive } from 'vue'
import UStepper from '@nuxt/ui/components/Stepper.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import URadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import Placeholder from '@/components/common/placeholder'
import UPopover from '@nuxt/ui/components/Popover.vue'
import UCalendar from '@nuxt/ui/components/Calendar.vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

export default defineComponent({
  setup() {
    const open = ref(false)

    const onClick = () => {
      open.value = !open.value
    }

    // Stepper configuration
    const items = [
      {
        title: '基本信息',
        description: '填写基本信息',
      },
      {
        title: '牙位',
        description: '选择牙位',
      },
      {
        title: '项目类型',
        description: '选择项目类型',
      },
      {
        title: '材料',
        description: '选择材料',
      },
      {
        title: '牙色',
        description: '选择牙色',
      },
      {
        title: '咬合空间和冠的类型',
        description: '选择咬合空间和冠的类型',
      },
      {
        title: '种植相关的问题',
        description: '选择种植相关的问题',
      },
      {
        title: '附件上传',
        description: '上传附件',
      },
      {
        title: '特别要求',
        description: '填写特别要求',
      },
      {
        title: '提交',
        description: '提交订单',
      },
    ]
    const step = ref(0) // UStepper is 1-indexed

    // Form state mimicking the image
    const state = reactive({
      dentistName: 'Lord Howard Florey',
      clinicName: 'Odontex Dental Labs',
      phone: '+61 412 345 678',
      email: 'Lord Howard Florey@gionline.com.au',
      date: '6月 21日, 2025',
      dueDate: '7月 6日, 2025',
      patientName: 'Thomas Keneally',
      gender: 'male',
      patientAge: '56',
      orderId: '20250621001',
    })

    const clinicOptions = [
      { label: 'Odontex Dental Labs', value: 'Odontex Dental Labs' },
      { label: 'Another Dental Lab', value: 'Another Dental Lab' },
    ]
    const genderOptions = [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' },
    ]

    // The main render function
    return () => (
      <div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Stepper */}
          <div class="lg:col-span-2">
            <UStepper size="sm" v-model={step.value} items={items} orientation="vertical" />
          </div>

          {/* Middle: Content */}
          <div class="lg:col-span-7">
            {step.value === 0 && (
              <div>
                <div class="pb-4 mb-4">
                  <h1 class="text-xl font-semibold">基本信息</h1>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <UFormField label="牙医姓名" name="dentistName" size="lg">
                    <UInput v-model={state.dentistName} class="w-full" />
                  </UFormField>
                  <UFormField label="诊所名称" name="clinicName" size="lg">
                    <USelect v-model={state.clinicName} items={clinicOptions} class="w-full" />
                  </UFormField>
                  <UFormField label="电话" name="phone" size="lg">
                    <UInput v-model={state.phone} class="w-full" />
                  </UFormField>
                  <UFormField label="邮箱" name="email" size="lg">
                    <UInput v-model={state.email} class="w-full" />
                  </UFormField>
                  <UFormField label="日期" name="date" size="lg">
                    <UInput
                      type="date"
                      v-model={state.date}
                      icon="i-heroicons-calendar-days"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="戴牙日期" name="dueDate" size="lg">
                    <UInput
                      type="date"
                      v-model={state.dueDate}
                      icon="i-heroicons-calendar-days"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="患者姓名" name="patientName" size="lg">
                    <UInput v-model={state.patientName} class="w-full" />
                  </UFormField>
                  <UFormField label="性别" name="gender" size="lg">
                    <URadioGroup
                      v-model={state.gender}
                      items={genderOptions}
                      orientation="horizontal"
                    />
                  </UFormField>
                  <UFormField label="患者年龄" name="patientAge" size="lg">
                    <UInput v-model={state.patientAge} class="w-full" />
                  </UFormField>
                  <UFormField label="订单号" name="orderId" size="lg">
                    <UInput v-model={state.orderId} disabled class="w-full" />
                  </UFormField>
                </div>
                <div class="flex justify-center mt-12">
                  <UButton
                    label="下一步"
                    size="lg"
                    onClick={() => {
                      step.value++
                    }}
                  />
                </div>
              </div>
            )}
            {/* Placeholder for other steps */}
            {step.value > 0 && (
              <Placeholder class="w-full h-[40rem]">
                <div class="text-dimmed">Content for {items[step.value]?.title}</div>
              </Placeholder>
            )}
          </div>

          {/* Right: Inspector */}
          <div class="lg:col-span-3">
            <Placeholder class="h-full">
              <span class="text-dimmed">暂无订单信息</span>
            </Placeholder>
          </div>
        </div>
      </div>
    )
  },
})
