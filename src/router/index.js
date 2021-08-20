import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: {
      title: "DA米商城"
    }

  },
  {
    path: '/buy/:id',
    name: 'Buy',
    component: () => import('../views/buy.vue'),
    alias: '/allproduct/buy:id',
    meta: {
      title: "购买页"
    }

  },
  {
    path: '/shoppingcart',
    name: 'shoppingCart',
    component: () => import('../views/shoppingCart.vue'),
    meta: {
      title: "购物车"
    }

  },
  {
    path: '/allproduct/:type',
    name: 'allProduct',
    component: () => import('../views/allProduct.vue'),
    meta: {
      title: "商品页"
    }

  },
  {
    path: '/search/:name',
    name: 'Search',
    component: () => import('../views/search.vue'),
    meta: {
      title: "搜索页"
    }

  },


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
