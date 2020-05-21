import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './../components/Login'
import Home from './../components/Home'
import Welcome from './../components/Welcome'
import Users from './../components/user/Users.vue'
import Role from './../components/role/Role.vue'
import Rights from './../components/role/Rights.vue'
import Goods from './../components/shop/Good.vue'
import Pramas from './../components/shop/Params.vue'
import Categroy from './../components/shop/Category.vue'
import Order from './../components/order/order.vue'
import Report from './../components/report/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/Welcome',
    children: [
      {
        path: '/Welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Role
      },
      {
        path: '/rights',
        component: Rights
      }, {
        path: '/goods',
        component: Goods
      },
      {
        path: '/params',
        component: Pramas
      },
      {
        path: '/categories',
        component: Categroy
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
