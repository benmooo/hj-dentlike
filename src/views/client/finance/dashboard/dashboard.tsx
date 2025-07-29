import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        color: '#888',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      finance dashboard
    </div>
  )
})
