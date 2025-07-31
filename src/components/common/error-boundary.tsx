import { defineComponent, ref, watch } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UAlert from '@nuxt/ui/components/Alert.vue'

import { useRoute, useRouter } from 'vue-router'

/// An Error Boundary component that wraps RouterView (or other components) and catches errors and displays them to the user.
export default defineComponent({
  name: 'ErrorBoundary',
  setup(_, { slots }) {
    const error = ref<Error | null>(null)
    const router = useRouter()
    const route = useRoute()

    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        if (newPath !== oldPath && error.value !== null) {
          // ErrorBoundary: Route changed, error state reset.
          error.value = null
        }
      },
    )

    const goBack = () => router.back()

    return {
      error,
      goBack,
      slots,
    }
  },

  errorCaptured(err, instance, info) {
    this.error = err as Error
    console.error('ErrorBoundary captured:', err, 'instance:', instance, 'info:', info)
    return false
  },

  render() {
    if (this.error !== null) {
      return (
        <div class="min-h-screen space-y-4">
          <UAlert
            icon="i-heroicons-exclamation-triangle"
            color="error"
            variant="soft"
            title="Oops！"
            description={this.error.message || '发生意外错误。请重试或返回。'}
          />
          {this.error.stack && (
            <div class="overflow-auto text-sm text-muted">
              <pre class="whitespace-pre-wrap font-mono text-xs">{this.error.stack}</pre>
            </div>
          )}
          <div class="flex justify-center pt-4">
            <UButton
              icon="i-heroicons-arrow-left"
              color="primary"
              variant="solid"
              onClick={this.goBack}
            >
              返回
            </UButton>
          </div>
        </div>
      )
    } else {
      return this.$slots.default && this.$slots.default()
    }
  },
})
