import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



/* const auth = (to, from, next) =>{
  const isLogged = localStorage.getItem('isLoggedIn');
  if(isLogged){
    next()
    return
  }
  next('/')
} */

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.getLoginStatus) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.getLoginStatus) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
   redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/forms/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/orders',
    name: 'Orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Orders.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:"/reported-orders",
    name:"ReportedOrders",
    component: () => import('../components/ReportedOrders.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/advertisements',
    name: 'Advertisement',
    component: () => import('../components/Advertisement.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/payments',
    name:'Payment',
    component: () => import('../components/payments/Payment.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/chef-approval',
    name:'ChefApproval',
    component: () => import('../components/requests/ChefApproval.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/seller-approval',
    name:'SellerApproval',
    component: () => import('../components/requests/SellerApproval.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/chefs',
    name:'Chefs',
    component: () => import('../components/users/Chefs.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/sellers',
    name:'Sellers',
    component: () => import('../components/users/Sellers.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/customers',
    name:'Customers',
    component: () => import('../components/users/Customers.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/manage-dishes',
    name:'Dishes',
    component: () => import('../components/Dishes.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/manage-products',
    name:'Products',
    component: () => import('../components/Products.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/dishPostings',
    name:'DishPosting',
    component: () => import('../components/postings/DishPosting.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/productPostings',
    name:'ProductPosting',
    component: () => import('../components/postings/ProductPosting.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/cities',
    name:'Cities',
    component: () => import('../components/regions/Cities.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/cities/:id/clusters',
    name:'Clusters',
    component: () => import('../components/regions/Clusters.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/clusters/:id/chapters',
    name:'Chapters',
    component: () => import('../components/regions/Chapters.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/chapters/:id/buildings',
    name:'Buildings',
    component: () => import('../components/regions/Buildings.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/global-params',
    name:'GlobalParams',
    component: () => import('../components/global/GlobalParams.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path:'/master-data',
    name:'MasterData',
    component: () => import('../components/master/MasterData.vue'),
    beforeEnter: ifAuthenticated,
  },
  { path: '*', redirect: '/' }
  
];


const router = new VueRouter({
  mode: 'history',
  routes
})

/* const router = new VueRouter({
  routes
}) */

export default router;
