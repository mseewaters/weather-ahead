import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/home/HomePage.vue'
import RegisterForm from '@/home/RegisterForm.vue'
import VerifyForm from '@/home/VerifyForm.vue'
import SigninForm from '@/home/SigninForm.vue'
import UserProfile from '@/customize/userProfile.vue'
import ForgotPassword from '@/home/ForgotPassword.vue'
import dataPrivacy from '@/legal/dataPrivacy.vue'
import termsConditions from '@/legal/termsConditions.vue'
import { isTokenValid } from '@/utils/authService'
import ToggleTest from '@/customize/toggleTest.vue'
import ToggleFirst from '@/customize/toggleFirst.vue'
import ToggleClaude from '@/customize/toggleClaude.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    redirect: '/signin',
    children: [
      {
        path: 'register',
        name: 'register',
        component: RegisterForm
      },
      {
        path: 'verify',
        name: 'verify',
        component: VerifyForm
      },
      {
        path: 'signin',
        name: 'signin',
        component: SigninForm
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: ForgotPassword
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/data',
    name: 'data',
    component: dataPrivacy
  },
  {
    path: '/terms',
    name: 'terms',
    component: termsConditions
  },
  {
    path: '/toggle',
    name: 'toggle',
    component: ToggleTest
  },
  {
    path: '/togglefirst',
    name: 'togglefirst',
    component: ToggleFirst
  },
  {
    path: '/toggleclaude',
    name: 'toggleclaude',
    component: ToggleClaude
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await isTokenValid();

  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router
