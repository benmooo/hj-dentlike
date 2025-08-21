import Chat from '@/components/chat/chat'
import Placeholder from '@/components/common/placeholder'
import Translation from '@/components/order/translation'
import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => (
    <div class="flex">
      {/*<Chat class="min-w-2xl max-w-4xl mx-auto" />*/}
      <Translation
        orderData={{
          appointmentNumber: 'APT-2024-001234',
          doctorName: 'Dr. Sarah Johnson',
          patientName: 'John Smith',
          clinicName: 'Sunrise Dental Clinic',
          gender: 'M',
          age: 45,
          phone: '+1-555-0123',
          dueDate: '2024-02-15',
          address: '123 Main Street, Anytown, ST 12345',
          designDetails: [
            {
              toothPosition: '14',
              productName: 'Crown - Porcelain',
              quantity: 1,
              toothColor: 'A2',
            },
            {
              toothPosition: '15',
              productName: 'Bridge - 3 Unit',
              quantity: 1,
              toothColor: 'A1',
            },
          ],
          designRequirements: 'Patient prefers natural look, high translucency for anterior region',
          orderNote: 'Rush order - patient has special event next week',
        }}
      />
    </div>
  )
})
