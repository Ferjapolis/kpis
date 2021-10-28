import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/editor.vue'
import Detalle from '../views/detailt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/detalle',
    name: 'Detalle',
    component: Detalle
  }, {
    path: '/editKpi',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
