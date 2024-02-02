import { createRouterMap ,createRoute} from './cerateRouterMap'

export function createMatch(routes) { //匹配器
   //1变成一个路由映射表   [{},{}]  => {'/':{组件相关信息}，'/about':{},/about/c:{}}
   const  pathMap  = createRouterMap(routes)
   //2addRoutes 动态添加路由
   // addRoutes(routes)
   function addRoutes(routes) { // 1:用户自己动态的路由  2
      // 注意需要合并在一起

      createRouterMap(routes, pathMap)
   }
   //    //案例  /about/c
   //    addRoutes([
   //       {
   //          path:'/about',
   //          component:'xx',
   //          children:[
   //             {
   //                path:'c',
   //                component:'xxxa'
   //             }
   //          ]
   //       }
   //    ])
   //   console.log(pathMap,6666)
   // /about/a    对应  router-view  router-view  /about/a:[/about,/a]
   //{'/':{组件相关信息}，'/about':{},/about/c:{}}
   //3路径要返回一个 数组
   function match(location) { //参数路由
      //记录
      let recode = pathMap[location]
      //有
      if (recode) {
         //定义一个方法
         return createRoute(recode, { path: location })
      }
      //没有
      return createRoute(null, { path: location })
   }
   console.log(match('/about/a')) // {/:[]}
   return {
      addRoutes,
      match
   }
}