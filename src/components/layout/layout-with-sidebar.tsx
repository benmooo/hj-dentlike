import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutWithSidebar',
  setup(props, { slots }) {
    return () => (
      <div class="layout-with-sidebar">
        <aside class="sidebar">侧边栏导航</aside>
        <main class="content">
          <header>工作台页头</header>
          {slots.default && slots.default()}
          <footer>工作台页脚</footer>
        </main>
      </div>
    );
  }
})
