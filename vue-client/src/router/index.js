import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Author from '@/components/Author'
import Book from '@/components/Book'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add-author',
      name: 'Author',
      component: Author
    },
    {
      path: '/add-book',
      name: 'Book',
      component: Book
    }
  ]
})
