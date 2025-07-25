import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/login/login'),
    },

    {
      path: '/auth/reset-password/verify-email',
      name: 'reset-password-verify-email',
      component: () => import('../views/auth/reset-password/verify-email'),
    },

    {
      path: '/auth/reset-password/verify-otp',
      name: 'reset-password-verify-otp',
      component: () => import('../views/auth/reset-password/verify-otp'),
    },

    {
      path: '/auth/reset-password/confirm',
      name: 'reset-password-confirm',
      component: () => import('../views/auth/reset-password/reset-pwd-confirm'),
    },

    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('../views/auth/signup/signup'),
    },
  ],
})

export default router
