import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vue-router/index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)// 插件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children:[ // /about/a
      {
        path:'a',
        component:{render:(h)=><div>a 页面</div>}
      }
    ]
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})
// 全家路由守卫
// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫 (2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
router.beforeEach((from,to,next)=>{
    console.log(1)
    setTimeout(() => {
      next()
    }, 1000);
})
router.beforeEach((from,to,next)=>{
  console.log(2)
  setTimeout(() => {
    next()
  }, 1000);
})
// [fn,fn] => 跟新数据
export default router
