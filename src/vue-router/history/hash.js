import {History} from './base'
function getHash(){
     return window.location.hash.slice(1) //注意 #/
}
class HashHistory extends History {
    constructor(router){
         super(router)
         this.router = router
         // 确保当前是hash 模式
         ensureSlash()
    }
    // 获取当前的路径
    getCurrentLocation(){
        return getHash()
    }
    //监听
    setUpLister(){
       window.addEventListener('hashchange',()=>{
           //跳转到最新的路径
           this.transitionTo(getHash())
       })
    }
}
function ensureSlash(){
    //是
   if(window.location.hash){
       return;
   }
   window.location.hash = '/'
}

export {
    HashHistory
}

// hash  #/