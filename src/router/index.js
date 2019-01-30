import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/dict',
    component: Layout,
    name: 'DictionaryManage',
    meta: {
      title: 'DictionaryManage',
      icon: 'tree'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/dictionarys/DictionaryList'),
        name: 'dictList',
        meta: { title: 'dictList' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'OrderManage',
    meta: {
      title: 'orderManage',
      icon: 'form'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/orders/OrderCreate'),
        name: 'OrderCreate',
        hidden: true,
        meta: { title: 'OrderCreate' }
      },
      {
        path: 'list',
        component: () => import('@/views/orders/OrderList'),
        name: 'OrderList',
        meta: { title: 'OrderList' }
      },
      {
        path: 'consignment',
        component: () => import('@/views/orders/ConsignmentList'),
        name: 'ConsignmentList',
        meta: { title: 'ConsignmentList' }
      },
      {
        path: 'orderRouterRules',
        component: () => import('@/views/orders/OrderRouterRules'),
        name: 'OrderRouterRules',
        meta: { title: 'OrderRouterRules' }
      },
      {
        path: 'detail/:id',
        hidden: true,
        name: 'OrderDetail',
        component: () => import('@/views/orders/OrderDetail'),
        meta: {
          title: 'OrderDetail'
        }
      },
      {
        path: ':consignmentCode',
        hidden: true,
        name: 'ConsignmentDetail',
        component: () => import('@/views/orders/ConsignmentDetail'),
        meta: {
          title: 'ConsignmentDetail'
        }
      }
    ]
  },
  {
    path: '/stock',
    component: Layout,
    name: 'StockManage',
    meta: {
      title: 'stockManage',
      icon: 'chart'
    },
    children: [
      {
        path: 'stockList',
        component: () => import('@/views/stocks/StockList'),
        name: 'StockList',
        meta: { title: 'StockList' }
      },
      {
        path: 'warehouseList',
        component: () => import('@/views/warehouses/WarehouseList'),
        name: 'WarehouseList',
        meta: { title: 'WarehouseList' }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    name: 'StoreManage',
    meta: {
      title: 'storeManage',
      icon: 'component'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/stores/StoresList'),
        name: 'StoreList',
        meta: { title: 'StoreList' }
      },
      {
        path: 'storesDetail',
        component: () => import('@/views/stores/StoresDetail'),
        name: 'StoresDetail',
        meta: { title: 'StoresDetail' }
      }
    ]
  },
  {
    path: '/reservoirArea',
    component: Layout,
    name: 'ReservoirAreaManage',
    meta: {
      title: 'reservoirAreaManage',
      icon: 'tab'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/reservoirArea/ReservoirAreaList'),
        name: 'ReservoirAreaList',
        meta: { title: 'ReservoirAreaList' }
      },
      {
        path: 'reservoirAreaDetail',
        component: () => import('@/views/reservoirArea/ReservoirAreaDetail'),
        name: 'ReservoirAreaDetail',
        meta: { title: 'ReservoirAreaDetail' }
      }
    ]
  },
  {
    path: '/customers',
    component: Layout,
    name: 'CustomerManage',
    meta: {
      title: 'customerManage',
      icon: 'peoples'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/customers/CustomerList'),
        name: 'CustomerList',
        meta: { title: 'CustomerList' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'productManage',
    meta: {
      title: 'productManage',
      icon: 'goods'
    },
    children: [
      {
        path: 'productlist',
        component: () => import('@/views/products/ProductList'),
        name: 'ProductList',
        meta: { title: 'ProductList' }
      },
      {
        path: 'pricelist',
        component: () => import('@/views/products/PriceList'),
        name: 'PriceList',
        meta: { title: 'PriceList' }
      },
      {
        path: 'categorylist',
        component: () => import('@/views/products/CategoryList'),
        name: 'CategoryList',
        meta: { title: 'CategoryList' }
      },
      {
        path: ':productdetail/:id(\\d+)',
        hidden: true,
        name: 'ProductDetail',
        component: () => import('@/views/products/ProductDetail'),
        meta: {
          title: 'ProductDetail'
        }
      }]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401' }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'account',
    meta: {
      icon: 'user',
      title: 'account'
    },
    children: [
      {
        path: 'user',
        name: 'AccountUser',
        component: () => import('@/views/account/user'),
        meta: {
          title: 'accountUser'
        }
      },
      {
        path: 'group',
        name: 'AccountGroup',
        component: () => import('@/views/account/group'),
        meta: {
          title: 'accountGroup'
        }
      },
      {
        path: 'role',
        name: 'AccountRole',
        component: () => import('@/views/account/role'),
        meta: {
          title: 'accountRole'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: Layout,
    name: 'Auth',
    meta: {
      icon: 'lock',
      title: 'auth'
    },
    children: [
      {
        path: 'oauth',
        name: 'Oauth',
        component: () => import('@/views/auth/router'),
        hidden: true,
        meta: {
          title: 'oauth'
        }
      },
      {
        path: 'router',
        name: 'AuthRouter',
        component: () => import('@/views/auth/router'),
        meta: {
          title: 'authRouter'
        }
      },
      {
        path: 'role',
        name: 'AuthRole',
        component: () => import('@/views/auth/role'),
        meta: {
          title: 'authRole'
        }
      }
    ]
  },
  {
    path: 'nacos',
    component: Layout,
    children: [
      {
        path: 'http://8848.gr89ce0e.p3lcmzo9.ae4b24.grapps.cn/nacos/',
        meta: { title: 'serviceCenter', icon: 'link' }
      }
    ]
  },
  {
    path: 'rain',
    component: Layout,
    children: [
      {
        path: 'http://116.247.124.34:7070/',
        meta: { title: 'serviceManage', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]
