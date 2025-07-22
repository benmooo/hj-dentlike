import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/hello-world'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <header>

          <div class="wrapper">
            <HelloWorld msg="You did it!" />

            <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
            </nav>
          </div>
        </header>

        <RouterView />
      </div>
    )
  },
})
