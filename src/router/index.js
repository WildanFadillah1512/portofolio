// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import Views
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Portfolio from '../views/Portfolio.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - Portfolio' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Me' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: { title: 'My Works' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Optional: Auto update <title> halaman
router.afterEach((to) => {
  document.title = to.meta.title || 'Portfolio'
})

export default router
