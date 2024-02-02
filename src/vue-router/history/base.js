 //公共方法
 // 面向对象   数据 属性  操作数据（方法）  抽离  封装  共用  继承  
 import {createRoute} from '../cerateRouterMap'
 function runQueue(queue,iterator,cb){
   // 异步(列队)执行  [fn1，fn2]
   function step(index){
      // 就是列队里面的函数执行完毕
      if(index>=queue.length) return cb()
       let hook = queue[index]
       iterator(hook,()=>step(index+1))
   }
   step(0)
 }
 class History{
     constructor(router){
        //    console.log(router,6669)
        this.router= router
       this.current =  createRoute(null,{path:'/'}) //保存当前最新的路由记录
     }
     push(to){
         this.transitionTo(to,()=>{
            window.location.hash = to
         })
     }
     listen(cb){
        this.cb = cb
     }
     //跳转
     transitionTo(location,cb){
        //  console.log(location)  //最新的路径
         //获取到最新的路由地址  根据这个地址渲染组件  match('/about/a')
         let router = this.router.match.match(location) //获取对应的路由记录
         // console.log( router,5555)
         //渲染数据 问题  数据改变 ，视图要改变  响应式  vue.utils
         this.current =  createRoute(router,{path:location}) // {'/':[]}
         //
         //获取到全局守卫列队
         let queue = [].concat(this.router.beforeHooks)
         //定义方法 列队执行
         const iterator = (hook,next)=>{
            // 当前的 
            hook(this.current,router,()=>{
               next()
            })
         }
         runQueue(queue,iterator,()=>{
            //跟新视图
            this.cb && this.cb(this.current)
            //执行这个函数
            cb && cb()
         })
       
     }
 }



 export {
    History 
 }