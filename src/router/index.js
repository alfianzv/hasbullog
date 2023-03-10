import Vue from 'vue'
import VueRouter from 'vue-router'
import Blogs from '../pages/Blogs.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import AuthorBlogs from '../pages/AuthorBlogs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blogs',
    component: Blogs
  },
  {
    path: '/:id',
    name: 'blogDetail',
    component: BlogDetail
  },
  {
    path: '/author/:id',
    name: 'authorBlogs',
    component: AuthorBlogs
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
