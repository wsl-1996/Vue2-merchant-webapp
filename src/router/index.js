import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/views/index'
import goodsmanager from '@/views/goodsmanager'
import ordermanager from '@/views/ordermanager'
import customservice from '@/views/customservice'
import my from '@/views/my'
import goodsDetail from '@/views/goodsDetail'
import orderDetail from '@/views/orderDetail'
import dialog from '@/views/dialog'
import userSettings from '@/views/userSettings'
import withdrawCash from '@/views/withdrawCash'
import modifyUser from '@/views/modifyUser'
import modifyInfo from '@/views/modifyInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/index',
      name:'index',
      component:index,
      redirect:'/goodsmanager',
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
      path:'/orderDetail/:orderId',
      name:'订单详情',
      component:orderDetail
    },
    {
      path:'/dialog/:userId',
      name:'对话框',
      component:dialog  
    },
    {
      path:'/userSettings',
      name:'用户设置',
      component:userSettings
    }, 
   {
      path:'/withdrawCash',
      name:'提现',
      component:withdrawCash
    }, 
    {
      path:'/modifyUser',
      name:'修改用户名',
      component:modifyUser
    }, 
    {
      path:'/modifyInfo',
      name:'修改用户信息',
      component:modifyInfo
    }, 
  ]
})
