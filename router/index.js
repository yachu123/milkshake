import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Add from '@/components/Add'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-recipe',
      name: 'Add',
      component: Add
    },
    {
      path: '/editer-page/:milkshake_slug',
      name: 'Editer',
      component: Edit
    }
  ]
})
