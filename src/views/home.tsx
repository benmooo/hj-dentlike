import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeView',
  setup() {
    return () => (
      <main>
        <div>
          <h1 class={'text-red-500'}>Welcome to the Home Page</h1>
          <p>This is the home page of the application.</p>
        </div>
      </main>
    )
  },
})
