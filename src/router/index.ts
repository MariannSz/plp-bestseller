import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:categoryId?',
      name: 'home',
      component: HomeView,
      props: (route) => ({ categoryId: route.params.categoryId || 'adults' }),
    },
    {
      path: '/product/:productId',
      name: 'product-detail',
      component: ProductDetail,
      props: true,
    },
  ],
})

export default router
