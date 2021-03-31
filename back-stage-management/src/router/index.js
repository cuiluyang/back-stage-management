import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function hasUrl(url) {
  return (JSON.parse(sessionStorage.getItem('user')).menus_url.some(val => val == url) || url == '/home')
}


const indexRouter = [
  {
    path: '/home',
    name: '首页',
    component: () => import('../views/home/home')
  },
  {
    path: '/menu',
    name: '菜单管理',
    component: () => import('../views/menu/menu'),
  },
  {
    path: '/role',
    name: '角色管理',
    component: () => import('../views/role/role')
  },
  {
    path: '/user',
    name: '管理员管理',
    component: () => import('../views/user/user')
  },
  {
    path: '/sort',
    name: '商品分类',
    component: () => import('../views/sort/sort')
  },
  {
    path: '/specs',
    name: '商品规格',
    component: () => import('../views/specs/specs')
  },
  {
    path: '/goods',
    name: '商品管理',
    component: () => import('../views/shop/goods')
  },
  {
    path: '/banner',
    name: '商品管理',
    component: () => import('../views/banner/banner')
  },
  {
    path: "",
    redirect: '/home'
  }
]





let router =  new Router({
  routes: [{
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        ...indexRouter
      ]
    },
    {
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//   if(to.path == '/login'){
//     next()
//     return
//   }else if(sessionStorage.getItem('user')){
//     hasUrl(to.path) ? next() : next('/index')
//     return
//   }else{
//     next('/login')
//   }
//   console.log(to.path);
  
// })

export default router


// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
