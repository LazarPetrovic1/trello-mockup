import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Page from '@/components/layout/Page'
import Blogs from '@/components/user/Blogs'
import Blog from '@/components/user/Blog'
import MakeBlog from '@/components/auth/MakeBlog'
import EditBlog from '@/components/auth/EditBlog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Page'})
        }
      }
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Page'})
        }
      }
    },
    {
      path: '/',
      name: 'Page',
      component: Page,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blogs/:id',
      name: 'Blog',
      component: Blog,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blogs/add',
      name: 'MakeBlog',
      component: MakeBlog,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blogs/edit/:id',
      name: 'EditBlog',
      component: EditBlog,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

