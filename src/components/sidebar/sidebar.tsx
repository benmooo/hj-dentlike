import { defineComponent, ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import UNavigationMenu from '@nuxt/ui/components/NavigationMenu.vue'

export default defineComponent({
  name: 'NavigationMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const items = ref<NavigationMenuItem[][]>(sidebarItems)

    return () => (
      <UNavigationMenu
        collapsed={props.collapsed}
        orientation="vertical"
        items={items.value}
        // highlight
        collapsible
        // popover
        tooltip
      />
    )
  },
})

const sidebarItems: NavigationMenuItem[][] = [
  [
    {
      label: 'Dashboard',
      type: 'label',
    },
    {
      label: 'Recent',
      icon: 'i-lucide-clock',
      to: '/client/home',
    },
  ],

  [
    {
      label: 'Order',
      type: 'label',
    },
    {
      label: 'NewPatient',
      icon: 'i-lucide-user-plus',
      to: '/client/create-order',
    },
    {
      label: 'Patients',
      icon: 'i-lucide-users',
      to: '/client/orders',
    },
  ],
  [
    {
      label: 'Finance',
      type: 'label',
    },
    {
      label: 'Statistics',
      icon: 'i-lucide-badge-dollar-sign',
      to: '/client/finance/dashboard',
    },
    {
      label: 'Bills',
      icon: 'i-lucide-receipt',
      to: '/client/finance/bills',
    },
  ],
  [
    {
      label: 'Me',
      type: 'label',
    },
    {
      label: 'Profile',
      icon: 'i-lucide-circle-user',
      to: '/client/user/profile',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/client/user/settings',
    },
  ],
  // admin routes
  [
    {
      label: 'Employees',
      icon: 'i-lucide-user-pen',
      to: '/admin/employees',
    },
  ],
  [
    {
      label: 'Exit',
      icon: 'i-lucide-log-out',
    },
  ],
]
