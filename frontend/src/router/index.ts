import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import categoryView from '@/views/category/index.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import BlogsView from '@/views/Blogs/index.vue'
import CreateBlogView from '@/views/Blogs/createBlog.vue'
import EditBlogView from '@/views/Blogs/EditBlog.vue'
import CategoryByBlogView from '@/views/blogByCategory/index.vue'
import BlogDetailView from '@/views/Blogs/detail/index.vue'
import CommentsView from '@/views/comments/index.vue'
import UsersView from '@/views/users/index.vue'
import SettingsViewVue from '@/views/Pages/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'eCommerce',
    component: ECommerceView,
    meta: {
      title: 'eCommerce Dashboard'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: categoryView,
    meta: {
      title: 'category'
    }
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsView,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/blogs/create',
    name: 'blog-create',
    component: CreateBlogView,
    meta: {
      title: 'Create Blog'
    }
  },
  {
    path: '/blogs/:id',
    name: 'blog-edit',
    component: EditBlogView,
    meta: {
      title: 'Edit Blog'
    }
  },
  {
    path: '/category/:id',
    name: 'blog-edit',
    component: CategoryByBlogView,
    meta: {
      title: 'Category By Blog'
    }
  },
  {
    path: '/:category/:name',
    name: 'blog-detail',
    component: BlogDetailView,
    meta: {
      title: 'Blog Detail'
    }
  },
  {
    path: '/comments',
    name: 'comments',
    component: CommentsView,
    meta: {
      title: 'Comments'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: {
      title: 'Users'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: SettingsViewVue,
    meta: {
      title: 'Users'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'  
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from , next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind Blog Admin`
  const authData = JSON.parse(localStorage.getItem('authData') as any)
  const isLoggedIn = authData ? true : false
  // If the user is logged in
  if (isLoggedIn) {
    // If they are trying to access the login or signup page, redirect to the dashboard (or another page)
    if (to.path === '/auth/signin' || to.path === '/auth/signup') {
      return next({ path: '/' }) // Or whatever page you want the user to be redirected to
    }
    // Allow navigation to other routes
    return next()
  }

  // If the user is not logged in
  // If they are trying to access a protected page (other than login/signup), redirect them to login page
  if (to.path !== '/auth/signin' && to.path !== '/auth/signup') {
    return next({ path: '/auth/signin' })
  }

  // If the user is not logged in and trying to access the login/signup pages, allow them
  next()
})

export default router
