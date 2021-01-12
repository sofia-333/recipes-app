import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import( '../views/RecipesList.vue')
  },
  {
    path: '/recipes/create',
    name: 'CreateRecipe',
    component: () => import( '../views/CreateRecipe.vue')
  },
  {
    path: `/recipes/:id`,
    name: 'ViewRecipe',
    component: () => import( '../views/ViewRecipe.vue')
  },
  {
    path: `/recipes/:id/update`,
    name: 'UpdateRecipe',
    component: () => import( '../views/UpdateRecipe.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
