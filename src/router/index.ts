import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home'
import { useAuthStore } from '@/stores/auth'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'

// route based layout
export const defaultLayout = 'default-layout'
export const layoutWithSidebar = 'layout-with-sidebar'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home'),
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
    },
    {
      path: '/about',
      name: 'about',

      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about'),
    },
    {
      path: '/auth/login',
      name: 'login',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: () => import('../views/auth/login/login'),
    },

    {
      path: '/auth/reset-password/verify-email',
      name: 'reset-password-verify-email',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: () => import('../views/auth/reset-password/verify-email'),
    },

    {
      path: '/auth/reset-password/verify-otp',
      name: 'reset-password-verify-otp',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: () => import('../views/auth/reset-password/verify-otp'),
    },

    {
      path: '/auth/reset-password/confirm',
      name: 'reset-password-confirm',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: () => import('../views/auth/reset-password/reset-pwd-confirm'),
    },

    {
      path: '/auth/signup',
      name: 'signup',
      meta: {
        requiresAuth: false,
        layout: defaultLayout,
      },
      component: () => import('../views/auth/signup/signup'),
    },

    {
      path: '/client/home',
      name: 'client-home',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/home/home'),
    },

    {
      path: '/client/create-order',
      name: 'client-create-order',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/order/create-order/create-order'),
    },

    {
      path: '/client/orders',
      name: 'client-orders',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/order/orders/orders'),
    },

    {
      path: '/client/orders/:id',
      name: 'client-order-detail',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/order/order-detail/order-detail'),
    },

    {
      path: '/client/finance/dashboard',
      name: 'client-finance-dashboard',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/finance/dashboard/dashboard'),
    },

    {
      path: '/client/finance/bills',
      name: 'client-finance-bills',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/finance/bills/bills'),
    },
    {
      path: '/client/user/profile',
      name: 'client-user-profile',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/user/profile/profile'),
    },
    {
      path: '/client/user/settings',
      name: 'client-user-settings',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/user/settings/settings'),
    },
    {
      path: '/client/user/practices/create',
      name: 'client-user-practices-create',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/client/user/practices/create-practice/create-practice'),
    },

    // ------------ admin ------------
    {
      path: '/admin/employees',
      name: 'admin-employees',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/employees/employees'),
    },
    {
      path: '/admin/employees/create',
      name: 'admin-employees-create',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/employees/create-employee/create-employee'),
    },
    {
      path: '/admin/doctors',
      name: 'admin-doctors',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/doctors/doctors'),
    },
    {
      path: '/admin/doctors/create',
      name: 'admin-doctors-create',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/doctors/create-doctor/create-doctor'),
    },
    {
      path: '/admin/roles',
      name: 'admin-roles',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/roles/roles'),
    },
    {
      path: '/admin/roles/create',
      name: 'admin-roles-create',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/roles/create-role/create-role'),
    },

    {
      path: '/admin/roles/:id',
      name: 'admin-role-detail',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/roles/role-detail/role-detail'),
    },

    {
      path: '/admin/products',
      name: 'admin-products',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/products/products'),
    },

    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      meta: {
        requiresAuth: true,
        layout: layoutWithSidebar,
      },
      component: () => import('../views/admin/products/create-product/create-product'),
    },

    // 404 page
    { path: '/:pathMatch(.*)', component: () => import('../views/exception/404') },
  ],
})

router.beforeEach(async (to) => {
  const { refreshAccessToken, accessToken } = useAuthStore()
  if (to.meta.requiresAuth && !accessToken) {
  }
})

export default router
