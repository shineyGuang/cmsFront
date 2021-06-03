import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome/Welcome')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/components/User/User')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!window.sessionStorage.getItem('token')) {
      return next('/login')
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
