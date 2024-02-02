

export function createRouterMap(routes,routerOptions={}) {
    // console.log(routes,5556)
    let pathMap = routerOptions
    routes.forEach(router => {
        //[{path:'/},{}]  => {'/':{组件相关信息}，'/about':{},/about/a:{}}
        addRouterRecode(router, pathMap)
    })
    //  console.log(pathMap)
     //问题 路由嵌套 /about/a
     return pathMap
}


function addRouterRecode(router, pathMap,parent) {
    // 1路径 /  记录

    let path = parent ?`${parent.path}/${router.path}`:router.path
    let recode = {
        path: router.path,
        name: router.name,
        component: router.component,
        parent
    }
    //添加
    if (!pathMap[path]) {
        pathMap[path] = recode
    }
    //有没有儿子
    if(router.children){
        //递归
        router.children.forEach(child=>{
            //注意 parent 
            addRouterRecode(child, pathMap,recode)
        })
    }
   
}

export function createRoute(recode,{path}){
   //定义结构
   let metched = []
   if(recode){
          //遍历
          while(recode){
            metched.unshift(recode) //  1：/about/a  /about
            recode =  recode.parent //一层一层找
          }
   }

   return {
    path,
    metched
   }
}



