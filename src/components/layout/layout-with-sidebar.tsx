import { defineComponent, ref, computed } from 'vue'
import Sidebar from '../sidebar/sidebar'
// import UIcon from '@nuxt/ui/components/Icon.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UDropdown from '@nuxt/ui/components/DropdownMenu.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import LocaleSwitcher from '../common/locale-switcher'
import ColorModeSwitcher from '../common/color-mode-switcher'
import ThemePickerPopover from '../theme/theme-picker-popover'

export default defineComponent({
  name: 'LayoutWithSidebar',
  setup(props, { slots }) {
    // Sidebar state management
    const isCollapsed = ref(false)

    const sidebarWidth = computed(() => (isCollapsed.value ? 'w-16' : 'w-60'))
    const mainMargin = computed(() => (isCollapsed.value ? 'ml-16' : 'ml-60'))

    // Toggle function
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    return () => (
      <div class="flex h-screen">
        {/* Sidebar */}
        <aside
          class={[
            'fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-in-out',
            'border-r border-muted',
            'shadow-sm',
            sidebarWidth.value,
          ]}
        >
          <div class="flex flex-col h-full">
            {/* Sidebar Header */}
            <div class="flex items-center justify-center h-16 px-4 border-b border-muted">
              {!isCollapsed.value ? (
                <div class="flex items-center space-x-2">
                  <UButton icon="i-lucide-bold" class="h-8 w-8" />
                  <h1 class="text-xl font-bold">DentLike</h1>
                </div>
              ) : (
                <UButton icon="i-lucide-bold" class="h-8 w-8" />
              )}
            </div>

            {/* Sidebar Content */}
            <div class={['flex-1 overflow-y-auto py-4', { 'mx-auto': isCollapsed.value }]}>
              <Sidebar collapsed={isCollapsed.value} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          class={['flex-1 flex flex-col transition-all duration-300 ease-in-out', mainMargin.value]}
        >
          {/* Header */}
          <header class="border-b border-muted h-16 flex items-center justify-between px-6">
            <div class="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <UButton
                variant="link"
                size="sm"
                icon={isCollapsed.value ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'}
                onClick={toggleSidebar}
                class={'h-5 w-5'}
                color="neutral"
              ></UButton>

              <h2 class="text-lg font-semibold">工作台</h2>
            </div>

            {/* Header Actions */}
            <div class="flex items-center space-x-3">
              <ColorModeSwitcher />
              <LocaleSwitcher />
              <ThemePickerPopover />

              <UButton variant="ghost" icon="i-lucide-bell" size="sm"></UButton>
              <UButton variant="ghost" size="sm" icon="i-lucide-settings"></UButton>

              <UDropdown
                items={[
                  [
                    {
                      label: '个人资料',
                      icon: 'i-lucide-user',
                      click: () => console.log('Profile'),
                    },
                    {
                      label: '设置',
                      icon: 'i-lucide-settings',
                      click: () => console.log('Settings'),
                    },
                  ],
                  [
                    {
                      label: '退出登录',
                      icon: 'i-lucide-log-out',
                      click: () => console.log('Logout'),
                    },
                  ],
                ]}
              >
                <UAvatar size="sm" src="/avatar-placeholder.jpg" alt="User Avatar" />
              </UDropdown>
            </div>
          </header>

          {/* Main Content Area */}
          <div class="flex-1 overflow-hidden">
            <div class="h-full overflow-y-auto">
              <div class="p-6">{slots.default && slots.default()}</div>
            </div>
          </div>

          {/* Footer */}
          {/* <footer>
            <div class="flex items-center justify-between px-6 py-4">
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <UButton variant='link' icon="i-lucide-copyright" size='sm' />
                <span>{new Date().getFullYear()} DentLike. All rights reserved.</span>
              </div>
            </div>
          </footer> */}
        </main>
      </div>
    )
  },
})
