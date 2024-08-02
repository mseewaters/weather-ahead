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
