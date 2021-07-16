import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/cuentaactivada',
    name: 'cuentaactivada',
    component: () => import(/* webpackChunkName: "login" */ '../views/CuentaActivada.vue')
  },
  {
    path: '/enviarcontrasena',
    name: 'enviarcontrasena',
    component: () => import(/* webpackChunkName: "login" */ '../views/EnviarContrasena.vue')
  },
  {
    path: '/',
    name: 'catalogo',
    component: () => import(/* webpackChunkName: "catalogo" */ '../views/Catalogo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
