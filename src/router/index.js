import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/home/HomePage.vue'
import RegisterForm from '@/home/RegisterForm.vue'
import VerifyForm from '@/home/VerifyForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
