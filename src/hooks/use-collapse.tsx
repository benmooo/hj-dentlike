import { ref } from 'vue'

export function useCollapse() {
  const isCollapsed = ref(false)

  function collapse() {
    isCollapsed.value = true
  }

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    collapse,
    toggleCollapse,
  }
}
