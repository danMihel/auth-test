import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'

const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/user',
    name: 'user',
    component: User,
   },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && localStorage.logged ==="false") next( {name:'login'});
  else next()
})

export default router
