import { defineComponent, ref, resolveComponent } from 'vue'

// Per your instructions, I'm importing Nuxt UI components directly.
// In a typical Nuxt project, these would often be auto-imported.
import UButton from '@nuxt/ui/components/Button.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UTable from '@nuxt/ui/components/Table.vue'
// import UIcon from '@nuxt/ui/components/Icon.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import Table0 from '@/components/__playground/table0'

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const orderStats = ref([
      {
        label: 'Draft Orders',
        count: 8,
        icon: 'i-lucide-list-restart',
        color: 'blue',
      },
      {
        label: 'Awaiting Receipt',
        count: 2,
        icon: 'i-heroicons-document-arrow-down',
        color: 'blue',
      },
      {
        label: 'Return for Revision',
        count: 0,
        icon: 'i-heroicons-arrow-uturn-left',
        color: 'orange',
      },
      {
        label: 'In Processing',
        count: 9,
        icon: 'i-heroicons-cog',
        color: 'amber',
      },
      {
        label: 'Completed',
        count: 10,
        icon: 'i-heroicons-check-circle',
        color: 'green',
      },
    ])

    const incompleteOrders = ref([
      {
        id: 1,
        orderId: '20250703001',
        patient: {
          name: 'Implant Individual',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        },
      },
      {
        id: 2,
        orderId: '20250703002',
        patient: {
          name: 'Implant Individual',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        },
      },
      {
        id: 3,
        orderId: '20250703003',
        patient: {
          name: 'Implant Individual',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        },
      },
    ])

    const casesInProcessing = ref([
      { id: 1, orderId: '20250703003', patient: { name: 'Implant Individual' }, status: 'Design' },
      {
        id: 2,
        orderId: '20250703004',
        patient: { name: 'Implant Individual' },
        status: 'Manufacturing',
      },
      { id: 3, orderId: '20250703005', patient: { name: 'Implant Individual' }, status: 'QA' },
      { id: 4, orderId: '20250703006', patient: { name: 'Implant Individual' }, status: 'Shipped' },
      { id: 5, orderId: '20250703007', patient: { name: 'Implant Individual' }, status: 'Design' },
      {
        id: 6,
        orderId: '20250703008',
        patient: { name: 'Implant Individual' },
        status: 'Manufacturing',
      },
    ])

    const incompleteOrdersColumns = [
      { key: 'patient', label: 'Patient', id: '1' },
      { id: '2', key: 'actions' },
    ]

    const casesInProcessingColumns = [
      { key: 'patient', label: 'Patient' },
      { key: 'orderId', label: 'Order ID' },
      { key: 'status', label: 'Status' },
      { key: 'actions' },
    ]

    return () => (
      <div>
        {/* Header */}
        <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p class="mt-1 text-md text-muted">
              Welcome back, here's a summary of your activities.
            </p>
          </div>
          <div class="flex items-center space-x-2 mt-4 sm:mt-0 flex-shrink-0">
            <UButton icon="i-heroicons-plus-circle-20-solid" size="lg" label="New Patient" />
            <UButton
              icon="i-heroicons-list-bullet-20-solid"
              size="lg"
              label="Existing Patients"
              variant="soft"
            />
          </div>
        </header>

        {/* Stats Cards */}
        <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {orderStats.value.map((stat) => (
            <UCard key={stat.label}>
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm font-medium text-muted">{stat.label}</p>
                  <p class="text-3xl font-bold mt-1">{stat.count}</p>
                </div>
                <div class={`rounded-md p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900/50`}>
                  <UButton icon={stat.icon} variant="link" color="neutral"></UButton>
                </div>
              </div>
            </UCard>
          ))}
        </section>

        {/* Main content grid */}
        <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main column */}
          <div class="lg:col-span-2 space-y-8">
            {/* Cases In Processing */}
            <UCard>
              {{
                header: () => (
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <h3 class="text-base/6 font-semibold">Cases In Processing</h3>
                    </div>
                    <UButton
                      label="Search"
                      trailing-icon="i-heroicons-magnifying-glass-20-solid"
                      variant="ghost"
                    />
                  </div>
                ),
                default: () => <UTable data={casesInProcessing.value} />,
              }}
            </UCard>
            {/* Incomplete Orders */}
            <UCard>
              {{
                header: () => (
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <h3 class="text-base/6 font-semibold">Incomplete Orders</h3>
                    </div>
                    <UBadge variant="subtle">{incompleteOrders.value.length}</UBadge>
                  </div>
                ),
                default: () => <UTable class="h-full" data={incompleteOrders.value} />,
              }}
            </UCard>
          </div>

          {/* Right/Side column */}
          <aside class="lg:col-span-1">
            <UCard>
              <div class="flex items-center gap-2">
                {/* <UIcon
                  name="i-heroicons-video-camera-20-solid"
                /> */}
                <h3 class="text-base/6 font-semibold text-gray-900 dark:text-white">
                  Operation Video
                </h3>
              </div>

              <div class="aspect-w-16 aspect-h-9">
                <img
                  class="w-full h-full object-cover rounded-md"
                  src="https://images.unsplash.com/photo-1521931961826-fe48677230a5?q=80&w=2940&auto=format&fit=crop"
                  alt="Operation Video Thumbnail"
                />
              </div>
              <p class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Learn about our streamlined digital dentistry process.
              </p>
              <UButton
                label="Watch Video"
                icon="i-heroicons-play-circle-20-solid"
                class="mt-4"
                color="secondary"
                variant="subtle"
                // size="lg"
                block
              />
            </UCard>
          </aside>
        </main>
      </div>
    )
  },
})
