import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home'
import { useAuthStore } from '@/stores/auth'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/about',
      name: 'about',

      meta: {
        requiresAuth: false,
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
      },
      component: () => import('../views/auth/login/login'),
    },

    {
      path: '/auth/reset-password/verify-email',
      name: 'reset-password-verify-email',
      meta: {
        requiresAuth: false,
      },
      component: () => import('../views/auth/reset-password/verify-email'),
    },

    {
      path: '/auth/reset-password/verify-otp',
      name: 'reset-password-verify-otp',
      meta: {
        requiresAuth: false,
      },
      component: () => import('../views/auth/reset-password/verify-otp'),
    },

    {
      path: '/auth/reset-password/confirm',
      name: 'reset-password-confirm',
      meta: {
        requiresAuth: false,
      },
      component: () => import('../views/auth/reset-password/reset-pwd-confirm'),
    },

    {
      path: '/auth/signup',
      name: 'signup',
      meta: {
        requiresAuth: false,
      },
      component: () => import('../views/auth/signup/signup'),
    },

    {
      path: '/client/home',
      name: 'client-home',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/client/home'),
    },
  ],
})

router.beforeEach(async (to) => {
  const { refreshAccessToken, accessToken } = useAuthStore()
  if (to.meta.requiresAuth && !accessToken) {
  }
})

export default router
