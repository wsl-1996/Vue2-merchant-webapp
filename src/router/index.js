import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import index from '@/views/index'
import goodsmanager from '@/views/goodsmanager'
import ordermanager from '@/views/ordermanager'
import customservice from '@/views/customservice'
import my from '@/views/my'
import goodsDetail from '@/views/goodsDetail'
import orderDetail from '@/views/orderDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },

    {
    path:'/register',
    name:'registerName',
    component:register
    },
    {
      path:'/index',
      name:'index',
      component:index,
      children:[
          {
              path:'/goodsmanager',
              name:'goodsmanager',
              component:goodsmanager
          },
          {
            path:'/ordermanager',
            name:'ordermanager',
            component:ordermanager
          },
          {
            path:'/customservice',
            name:'customservice',
            component:customservice
        },
        {
          path:'/my',
          name:'my',
          component:my
        },
      ]
    },
    {
      path:'/goodsDetail/:productId',
      name:'商品详情',
      component:goodsDetail
    }, 
    {
      path:'/orderDetail',
      name:'商品详情',
      component:orderDetail
    }   
  ]
})
